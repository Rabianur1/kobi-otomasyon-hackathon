import csv
import os
from google import genai
from google.genai import types
from sqlalchemy.orm import Session
from app.models import Product, Customer, Order
from app.database import engine, Base
from dotenv import load_dotenv

os.environ["GEMINI_API_KEY"] = "AIzaSyAUKAskWjLVShr4dmk4rLeByxU1ECGNqFA"
os.environ["GOOGLE_API_KEY"] = "AIzaSyAUKAskWjLVShr4dmk4rLeByxU1ECGNqFA"

# .env dosyasındaki ortam değişkenlerini yükler
load_dotenv()

# Otomatik olarak arka planda .env içindeki GEMINI_API_KEY'i bulur.
client = genai.Client()

def load_dataset_to_db(db: Session):
    Base.metadata.create_all(bind=engine)
    if db.query(Product).first():
        return

    # 1. Ürünleri CSV'den Okuma (products.csv)
    products_map = {}
    csv_prod_path = os.path.join("data", "products.csv")
    if os.path.exists(csv_prod_path):
        with open(csv_prod_path, mode="r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                clean_price = float(row["price"].replace(" TL", "").replace(",", "."))
                product = Product(
                    name=row["name"],
                    category=row["category"],
                    stock=int(row["stock"]),
                    criticalStock=int(row.get("criticalStock", 10)), # Eğer CSV'de yoksa varsayılan 10
                    price=clean_price
                )
                db.add(product)
                db.flush() 
                products_map[row["name"]] = product.id
        db.commit()

    # 2. Siparişleri CSV'den Okuma (orders.csv)
    csv_order_path = os.path.join("data", "orders.csv")
    if os.path.exists(csv_order_path):
        # Önce bir test müşterisi oluşturalım (Siparişleri buna bağlayacağız)
        test_customer = Customer(name="Genel Müşteri", phone="5550000000")
        db.add(test_customer)
        db.commit()

        with open(csv_order_path, mode="r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                # CSV'deki ürün ismine göre ID'yi bul
                p_id = products_map.get(row["product"], 1) # Bulamazsa 1. ürünü ata
                order = Order(
                    customer_id=test_customer.id,
                    product_id=p_id,
                    quantity=1,
                    status=row["status"],
                    tracking_number=f"TRK{row['id']}" # CSV ID'sini takip no yaptık
                )
                db.add(order)
        db.commit()

def process_chat_message(message: str, customer_id: int, db: Session) -> str:
    # ARAÇ 1: Sipariş Durumu
    def check_order_status(order_id: int) -> str:
        order = db.query(Order).filter(Order.id == order_id).first()
        if not order: return f"{order_id} numaralı sipariş bulunamadı."
        product = db.query(Product).filter(Product.id == order.product_id).first()
        return f"Ürün: {product.name}, Durum: {order.status}"

    # ARAÇ 2: Ürün ve Stok Sorgulama 
    def get_product_info(product_name: str) -> str:
        """Veritabanında ürün arar ve stok/fiyat bilgisi döner."""
        products = db.query(Product).filter(Product.name.contains(product_name)).all()
        if not products: return f"'{product_name}' ile ilgili bir ürün bulunamadı."
        results = []
        for p in products:
            results.append(f"{p.name}: Fiyat {p.price} TL, Stokta {p.stock} adet var.")
        return " | ".join(results)

    system_instruction = """
    Sen bir KOBİ için çalışan profesyonel bir yapay zeka asistanısın. 
    İki ana görevin var:
    1. Sipariş durumu soranlara 'check_order_status' aracını kullanarak bilgi vermek.
    2. Ürün, stok veya fiyat soranlara 'get_product_info' aracını kullanarak bilgi vermek.
    Eğer müşteri genel bir ürün grubu (örneğin 'ballar') sorarsa, ürün ismini 'Bal' olarak arat. 
    Her zaman nazik ve yardımcı ol. Veritabanı sorgusu yaptığını hissettirme, bir mağaza görevlisi gibi cevap ver.
    Cevaplarında TL simgesini kullan ve stokta az kalan ürünler (10 adetten az) için müşteriye 'Hızlı tükeniyor, kaçırmayın!' gibi hafif bir satın alma teşviki yap.
    """

    client = genai.Client()
    chat = client.chats.create(
        model="gemini-2.0-flash",
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            tools=[check_order_status, get_product_info], 
            temperature=0.3
        )
    )
    response = chat.send_message(message)
    return response.text
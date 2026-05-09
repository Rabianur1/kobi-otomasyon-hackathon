import csv
import os
import google.generativeai as genai
from sqlalchemy.orm import Session
from app.models import Product, Customer, Order
from app.database import engine, Base
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)
# ---------------------------------

def load_dataset_to_db(db: Session):
    Base.metadata.create_all(bind=engine)
    if db.query(Product).first():
        return

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
                    criticalStock=int(row.get("criticalStock", 10)),
                    price=clean_price
                )
                db.add(product)
                db.flush() 
                products_map[row["name"]] = product.id
        db.commit()

    csv_order_path = os.path.join("data", "orders.csv")
    if os.path.exists(csv_order_path):
        test_customer = Customer(name="Genel Müşteri", phone="5550000000")
        db.add(test_customer)
        db.commit()

        with open(csv_order_path, mode="r", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                p_id = products_map.get(row["product"], 1)
                order = Order(
                    customer_id=test_customer.id,
                    product_id=p_id,
                    quantity=1,
                    status=row["status"],
                    tracking_number=f"TRK{row['id']}"
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

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        tools=[check_order_status, get_product_info],
        system_instruction=system_instruction
    )
    chat = model.start_chat(enable_automatic_function_calling=True)
    
    try:
        response = chat.send_message(message)
        return response.text
    except Exception as e:
        print(f"HATA: {e}")
        return "Şu an sistemde kısa süreli bir yoğunluk var, lütfen birazdan tekrar deneyin."
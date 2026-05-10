import csv
import os
from google import genai
from google.genai import types
from sqlalchemy.orm import Session
from app.models import Product, Customer, Order
from app.database import engine, Base
from dotenv import load_dotenv

load_dotenv()
client = genai.Client()


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
                    price=clean_price,
                )

                db.add(product)
                db.flush()
                products_map[row["name"]] = product.id

        db.commit()

    csv_order_path = os.path.join("data", "orders.csv")

    if os.path.exists(csv_order_path):
        customers_map = {}

        with open(csv_order_path, mode="r", encoding="utf-8") as file:
            reader = csv.DictReader(file)

            for row in reader:
                customer_name = row.get("customer", "Genel Müşteri")

                if customer_name not in customers_map:
                    customer = Customer(
                        name=customer_name,
                        phone=f"555{len(customers_map) + 1:07d}",
                    )
                    db.add(customer)
                    db.flush()
                    customers_map[customer_name] = customer.id

                product_id = products_map.get(row["product"], 1)

                order = Order(
                    customer_id=customers_map[customer_name],
                    product_id=product_id,
                    quantity=1,
                    status=row["status"],
                    tracking_number=f"TRK{row['id']}",
                    order_date=row.get("orderDate"),
                    shipped_date=row.get("shippedDate"),
                    estimated_delivery=row.get("estimatedDelivery"),
                    delivered_date=row.get("deliveredDate"),
                    city=row.get("city"),
                    priority=row.get("priority"),
                )

                db.add(order)

        db.commit()


def process_chat_message(message: str, customer_id: int, db: Session) -> str:
    def check_order_status(order_id: int) -> str:
        order = db.query(Order).filter(Order.id == order_id).first()

        if not order:
            return f"{order_id} numaralı sipariş bulunamadı."

        product = db.query(Product).filter(Product.id == order.product_id).first()
        customer = db.query(Customer).filter(Customer.id == order.customer_id).first()

        return (
            f"Müşteri: {customer.name if customer else 'Genel Müşteri'}, "
            f"Ürün: {product.name if product else 'Ürün bulunamadı'}, "
            f"Durum: {order.status}, "
            f"Sipariş tarihi: {order.order_date}, "
            f"Kargoya veriliş tarihi: {order.shipped_date or 'Henüz kargoya verilmedi'}, "
            f"Tahmini teslimat: {order.estimated_delivery}, "
            f"Teslim tarihi: {order.delivered_date or 'Henüz teslim edilmedi'}, "
            f"Şehir: {order.city}, "
            f"Öncelik: {order.priority}, "
            f"Takip numarası: {order.tracking_number}"
        )

    def get_product_info(product_name: str) -> str:
        products = db.query(Product).filter(Product.name.contains(product_name)).all()

        if not products:
            return f"'{product_name}' ile ilgili bir ürün bulunamadı."

        results = []

        for product in products:
            results.append(
                f"{product.name}: Fiyat {product.price} TL, stokta {product.stock} adet var."
            )

        return " | ".join(results)

    system_instruction = """
    Sen bir KOBİ için çalışan profesyonel bir yapay zeka asistanısın.
    İki ana görevin var:
    1. Sipariş durumu soranlara 'check_order_status' aracını kullanarak bilgi vermek.
    2. Ürün, stok veya fiyat soranlara 'get_product_info' aracını kullanarak bilgi vermek.

    Müşteri sipariş numarası verirse ilgili siparişin durumunu, ürününü, tahmini teslimat tarihini ve takip numarasını açıkça söyle.
    Eğer sipariş henüz kargoya verilmediyse bunu nazikçe belirt.
    Eğer sipariş teslim edildiyse teslim tarihini belirt.
    Eğer ürün, stok veya fiyat sorulursa ürün bilgisini doğal bir mağaza görevlisi gibi açıkla.
    Veritabanı sorgusu yaptığını hissettirme.
    Cevaplarında TL simgesini kullan.
    Stokta az kalan ürünler için müşteriye nazikçe 'Hızlı tükeniyor, kaçırmayın!' gibi hafif bir satın alma teşviki yap.
    Her zaman kısa, anlaşılır ve yardımcı bir Türkçe kullan.
    """

    chat = client.chats.create(
        model="gemini-2.5-flash",
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            tools=[check_order_status, get_product_info],
            temperature=0.3,
        ),
    )

    response = chat.send_message(message)
    return response.text
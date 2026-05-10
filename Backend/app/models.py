from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from app.database import Base


# SQLAlchemy Modelleri (Veritabanı Tabloları)
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String)
    stock = Column(Integer)
    criticalStock = Column(Integer)
    price = Column(Float)


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone = Column(String, unique=True, index=True)


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    product_id = Column(Integer, ForeignKey("products.id"))

    quantity = Column(Integer)
    status = Column(String)
    tracking_number = Column(String)

    order_date = Column(String)
    shipped_date = Column(String)
    estimated_delivery = Column(String)
    delivered_date = Column(String)

    city = Column(String)
    priority = Column(String)

    customer = relationship("Customer")
    product = relationship("Product")


# Pydantic Şemaları (API İstek/Yanıt Doğrulama)
class ChatRequest(BaseModel):
    message: str
    customer_id: int


class ChatResponse(BaseModel):
    response: str
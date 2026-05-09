from fastapi import FastAPI, Depends, HTTPException
from fastapi import Form, Response
from fastapi.middleware.cors import CORSMiddleware
from twilio.twiml.messaging_response import MessagingResponse
from sqlalchemy.orm import Session
from app.database import engine, get_db
from app.models import ChatRequest, ChatResponse, Order, Product
from app.services import load_dataset_to_db, process_chat_message
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    db = next(get_db())
    load_dataset_to_db(db) 
    yield

app = FastAPI(title="SmartKOBİ AI Agent API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest, db: Session = Depends(get_db)):
    try:
        ai_response = process_chat_message(request.message, request.customer_id, db)
        return ChatResponse(response=ai_response)
    except Exception as e:
        if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
            return ChatResponse(response="Değerli müşterimiz, şu an yoğunluk nedeniyle size yardımcı olamıyorum ama siparişleriniz güvende! Lütfen az sonra tekrar deneyiniz.")
        raise HTTPException(status_code=500, detail=f"Sistemde bir hata oluştu: {str(e)}")

@app.post("/webhook/whatsapp")
async def whatsapp_webhook(Body: str = Form(...), From: str = Form(...), db: Session = Depends(get_db)):
    # Body: Gelen mesaj metni
    # From: Gönderen kişinin telefon numarası (örn: whatsapp:+90555...)
    # Telefon numarasından müşteriyi tanı (Basit bir eşleştirme)
    # Gerçek projede telefon numarasını DB'de aratıp customer_id'yi buluruz
    customer_id = 1 
    ai_response = process_chat_message(Body, customer_id, db)
    # Twilio'nun anlayacağı formatta (TwiML) cevap dönüyoruz
    resp = MessagingResponse()
    resp.message(ai_response)
    return Response(content=str(resp), media_type="application/xml")

@app.get("/api/dashboard/summary")
def dashboard_summary(db: Session = Depends(get_db)):
    """Yönetici paneli için özet veri endpoint'i"""
    total_orders = db.query(Order).count()
    pending_orders = db.query(Order).filter(Order.status == "Bekliyor").count()
    shipped_orders = db.query(Order).filter(Order.status == "Kargoya Verildi").count()
    low_stock_products = db.query(Product).filter(Product.stock < Product.criticalStock).all()
    
    return {
        "summary": {
            "toplam_siparis": total_orders,
            "bekleyen_siparis": pending_orders,
            "kargodaki_siparis": shipped_orders
        },
        "kritik_stok_uyarilari": [
            {"id": p.id, "urun_adi": p.name, "kalan_stok": p.stock} 
            for p in low_stock_products
        ]
    }

@app.get("/api/products")
async def get_products(db: Session = Depends(get_db)): 
    products = db.query(Product).all()
    return products

@app.get("/api/orders")
async def get_orders(db: Session = Depends(get_db)):
    orders = db.query(Order).all()
    return orders
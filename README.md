# 🤖 SmartOps AI: Yapay Zeka Destekli İşletme Asistanı

**Python • FastAPI • Gemini • React**

SmartOps AI, KOBİ’lerin müşteri iletişimini, sipariş süreçlerini ve stok takibini yapay zeka desteğiyle yönetmesini sağlayan bir işletme otomasyon prototipidir.

Sistem; müşteri sorularını doğal dil ile yanıtlayabilen AI destekli bir asistan, gerçek zamanlı dashboard analizi ve operasyon yönetimi özellikleri sunmaktadır.

---

# 🌟 Temel Özellikler

## 🤖 AI Müşteri Asistanı

Gemini 2.5 Flash modeli ile güçlendirilen yapay zeka asistanı:

- sipariş sorgulama,
- stok kontrolü,
- ürün bilgisi,
- teslimat durumu,
- fiyat bilgisi

gibi işlemleri doğal dil üzerinden gerçekleştirebilir.

---

## 📦 Sipariş ve Teslimat Yönetimi

Müşteriler:

- sipariş durumunu,
- takip numarasını,
- teslimat sürecini,
- tahmini teslim tarihini

anlık olarak öğrenebilir.

---

## 📊 AI Destekli Dashboard

Yönetici panelinde:

- toplam sipariş,
- hazırlanmakta olan siparişler,
- kargodaki siparişler,
- kritik stok uyarıları,
- haftalık sipariş yoğunluğu,
- müşteri mesaj analizleri

gerçek zamanlı görüntülenebilir.

Dashboard sistemi müşteri mesajlarını analiz ederek operasyonel içgörü üretmektedir.

---

## 📈 Dinamik Veri Yönetimi

Sistem:

- `products.csv`
- `orders.csv`

dosyalarındaki verileri SQLite veritabanına aktarır.

Sipariş tarihleri analiz edilerek haftalık sipariş yoğunluğu grafikleri oluşturulur.

---

## 🚨 Kritik Stok Uyarı Sistemi

Kritik stok seviyesinin altına düşen ürünler dashboard üzerinde otomatik olarak işaretlenir.

---

# 🧠 Yapay Zeka Yaklaşımı

## 🔧 Function Calling Tabanlı AI Agent

Gemini modeli, Function Calling yaklaşımıyla veritabanı araçlarını kullanarak gerçek sipariş ve ürün verilerine erişmektedir.

Sistem:

- kullanıcı mesajını analiz eder,
- uygun aracı seçer,
- veritabanından veri çeker,
- doğal dilde yanıt üretir.

Bu yaklaşım sayesinde hallucination riski azaltılmıştır.

---

## 📡 AI Destekli Mesaj Analizi

Sistem müşteri mesajlarını analiz ederek:

- teslimat,
- stok,
- fiyat

eğilimlerini belirler ve dashboard üzerinde operasyonel analiz olarak görüntüler.

---

# 🏗️ Sistem Mimarisi

## 🎨 Frontend

- React
- Vite
- TailwindCSS

---

## ⚙️ Backend

- Python
- FastAPI

---

## 🗄️ Veritabanı

- SQLite
- SQLAlchemy ORM

---

## 🤖 Yapay Zeka Katmanı

- Google Gemini 2.5 Flash
- Function Calling yaklaşımı

---

# 🔗 Entegrasyonlar

- Google Gemini API
- FastAPI REST API
- SQLite
- Twilio Webhook API

Twilio tabanlı WhatsApp entegrasyonu prototip seviyesinde desteklenmektedir.

---

# 🛠️ Kurulum ve Çalıştırma

## 1️⃣ Gereksinimler

- Python 3.9+
- Node.js
- Google Gemini API Key
- Ngrok (Opsiyonel)

---

# 2️⃣ Projeyi Klonlayın

```bash
git clone https://github.com/Rabianur1/kobi-otomasyon-hackathon.git

cd kobi-otomasyon-hackathon
```

---

# ⚙️ Backend Kurulumu

```bash
cd Backend

python -m venv venv

# Windows
.\venv\Scripts\activate

pip install -r requirements.txt
```

---

## 🔑 .env Dosyası Oluşturun

Backend klasörü içine `.env` dosyası oluşturun:

```env
GEMINI_API_KEY=your_api_key_here
```

---

## ▶️ Backend'i Başlatın

```bash
python run.py
```

Backend çalıştığında:

```text
http://127.0.0.1:8000
```

adresinde aktif olacaktır.

---

# 🎨 Frontend Kurulumu

```bash
cd Frontend

npm install

npm run dev
```

Frontend çalıştığında:

```text
http://localhost:5173
```

adresinde aktif olacaktır.

---

# 🔐 Demo Giriş Bilgileri

Satıcı paneli için:

```text
Kullanıcı Adı: admin
Şifre: 1234
```

---

# 🔑 Gemini API Anahtarı Nasıl Alınır?

1. Google AI Studio adresine gidin.
2. Google hesabınızla giriş yapın.
3. “Get API Key” seçeneğine tıklayın.
4. “Create API key in new project” seçeneğini seçin.
5. Oluşturulan anahtarı `.env` dosyasına ekleyin.

---

# 📌 Kullanılan Teknolojiler

- Python
- FastAPI
- React
- Vite
- TailwindCSS
- SQLAlchemy
- SQLite
- Google Gemini 2.5 Flash
- Twilio Webhook API

---

# 👥 Takım

SmartOps AI, hackathon kapsamında geliştirilen ekip çalışması odaklı bir yapay zeka destekli işletme otomasyon projesidir.
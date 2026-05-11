# 🤖 SmartOps AI: Yapay Zeka Destekli Yeni Nesil İşletme Asistanı

**Python • FastAPI • Gemini • React**

SmartOps AI, geleneksel işletme yönetimini bir adım öteye taşıyarak KOBİ’lerin müşteri ilişkilerini, sipariş süreçlerini ve stok takibini tek bir merkezden yapay zeka desteğiyle yönetmesini sağlayan bir prototiptir. Projemizin amacı, işletme sahiplerinin operasyonel yükünü azaltırken müşterilere 7/24 kesintisiz, hızlı ve akıllı bir hizmet sunmaktır.

---

# 🌟 Neden SmartOps AI?

Projemiz, işletmelerin günlük operasyonlarında en çok zaman harcadığı iki temel probleme odaklanmaktadır:

- Müşteri taleplerini hızlı şekilde yanıtlamak
- Sipariş ve stok süreçlerini etkin yönetmek

## 📦 Akıllı Müşteri Deneyimi

Müşteriler, web arayüzü üzerinden sipariş durumu, teslimat tarihi veya ürün bilgisi sorduğunda, SmartOps AI gerçek verileri analiz ederek saniyeler içerisinde doğal dilde yanıt üretir. Sistem, Twilio tabanlı WhatsApp entegrasyon altyapısını destekleyecek şekilde tasarlanmıştır.

## 📊 AI Destekli Veri Odaklı Yönetim

İşletme sahipleri dashboard üzerinden:

- kritik stok durumlarını,
- sipariş yoğunluğunu,
- haftalık sipariş analizlerini,
- teslimat süreçlerini,
- müşteri mesaj eğilimlerini

anlık olarak görüntüleyebilir.

Dashboard sistemi, müşteri mesajlarını analiz ederek operasyonel içgörüler üretir ve AI destekli günlük operasyon özeti oluşturur.

## ⚡ Ölçeklenebilir Altyapı

Gerçekçi ürün ve sipariş senaryolarıyla test edilen sistem, genişletilebilir bir backend mimarisi üzerine kurulmuştur.

---

# 🚀 Prototip Özellikleri

## 🤖 AI Chatbot (Web Destekli & WhatsApp Entegrasyonuna Hazır)

Gemini 2.5 Flash modeli ile güçlendirilen yapay zeka asistanı:

- sipariş sorgulama,
- ürün bilgisi,
- stok kontrolü,
- teslimat bilgisi

gibi işlemleri doğal dil üzerinden gerçekleştirebilir.

---

## 📦 Akıllı Sipariş Sorgulama

Müşteriler yalnızca sipariş numaralarını yazarak:

- sipariş durumunu,
- takip numarasını,
- tahmini teslimat tarihini,
- teslimat sürecini

öğrenebilir.

---

## 📈 Dinamik Envanter ve Sipariş Analizi

CSV tabanlı ürün ve sipariş verileri işlenerek dashboard üzerinde:

- canlı stok takibi,
- sipariş yoğunluğu analizi,
- şehir bazlı sipariş görüntüleme,
- teslimat süreci yönetimi

dinamik olarak sağlanmaktadır.

---

## 🚨 Kritik Stok Uyarı Sistemi

Kritik eşik seviyesinin altına düşen ürünler dashboard üzerinde otomatik olarak işaretlenir.

---

## 📊 AI Destekli Yönetici Dashboard Sistemi

Dashboard üzerinden:

- toplam sipariş,
- hazırlanmakta olan siparişler,
- kargodaki siparişler,
- kritik stok uyarıları,
- haftalık sipariş yoğunluğu,
- müşteri mesaj analizleri,
- operasyonel AI özetleri

anlık olarak görüntülenebilir.

Dashboard, gerçek backend verileriyle çalışmakta ve müşteri mesaj eğilimlerine göre dinamik operasyon analizi üretmektedir.

---

# 🧠 Yapay Zeka Yaklaşımımız

## 🔧 Function Calling Tabanlı AI Agent

Gemini modeli, Function Calling yaklaşımıyla veritabanı araçlarını kullanarak gerçek sipariş ve ürün verilerine erişmektedir.

Sistem:

- kullanıcı mesajını analiz eder,
- uygun aracı seçer,
- veritabanından veri çeker,
- doğal dilde yanıt üretir.

Bu yaklaşım sayesinde bilgi uydurma (hallucination) riski azaltılmıştır.

---

## 📡 AI Destekli Mesaj Analizi

Sistem, müşteri mesajlarını analiz ederek:

- teslimat odaklı sorguları,
- stok sorgularını,
- fiyat sorgularını

kategorize eder.

Bu analizler dashboard üzerinde operasyonel içgörü olarak görüntülenir ve işletme sahiplerinin müşteri taleplerini daha iyi anlamasına yardımcı olur.

---

## 🗂 Veri ile Etkileşim

Sistem:

- `products.csv`
- `orders.csv`

dosyalarından alınan verileri SQLite veritabanına aktarır.

Sipariş tarihleri analiz edilerek haftalık sipariş yoğunluğu grafikleri oluşturulur ve dashboard üzerinde gerçek zamanlı görselleştirilir.

---

## 🛡️ Hata Yönetimi

API kota limitleri ve bağlantı problemleri için hata yönetim mekanizmaları geliştirilmiştir. Böylece kullanıcı deneyiminin kesintiye uğramaması hedeflenmiştir.

---

# 🏗️ Sistem Mimarisi

## 🎨 Frontend

Modern kullanıcı arayüzü:

- React
- Vite
- TailwindCSS

teknolojileri kullanılarak geliştirilmiştir.

---

## ⚙️ Backend

Backend tarafında:

- Python
- FastAPI

kullanılmıştır.

FastAPI’nin hızlı ve modern yapısı sayesinde API iletişimi optimize edilmiştir.

---

## 🗄️ Veritabanı Katmanı

Veriler:

- SQLite
- SQLAlchemy ORM

kullanılarak yönetilmektedir.

---

## 🤖 Yapay Zeka Katmanı

Yapay zeka altyapısında:

- Google Gemini 2.5 Flash
- Function Calling yaklaşımı

kullanılmaktadır.

Gemini modeli hem müşteri destek asistanı olarak çalışmakta hem de operasyonel veri analizi süreçlerinde kullanılmaktadır.

---

# 🔗 Harici Sistem Entegrasyonları

SmartOps AI aşağıdaki sistemlerle entegre çalışmaktadır:

- Google Gemini API
- FastAPI REST API yapısı
- SQLite Veritabanı
- Twilio Webhook API

Twilio tabanlı WhatsApp entegrasyonu prototip seviyesinde desteklenmektedir.

---

# 🛠️ Kurulum ve Çalıştırma

## 1️⃣ Gereksinimler

- Python 3.9+
- Node.js
- Google Gemini API Key
- Ngrok (Opsiyonel, webhook testleri için)

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
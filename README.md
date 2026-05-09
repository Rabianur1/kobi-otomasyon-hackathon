# 🤖 SmartKOBİ: Yapay Zeka Destekli Yeni Nesil İşletme Asistanı

![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-Modern--Framework-green.svg)
![Gemini](https://img.shields.io/badge/Google-Gemini%202.0%20Flash-orange.svg)

**SmartKOBİ**, geleneksel işletme yönetimini bir adım öteye taşıyarak, KOBİ'lerin müşteri ilişkilerini ve stok süreçlerini tek bir merkezden, yapay zeka ile yönetmesini sağlayan bir prototiptir. Amacımız, işletme sahiplerinin operasyonel yükünü azaltırken, müşterilere 7/24 kesintisiz ve akıllı bir hizmet sunmaktır.

---

## 🌟 Neden SmartKOBİ?

Projemiz, bir işletmenin günlük hayatta en çok vakit harcadığı iki temel soruna odaklanıyor: **Müşteri taleplerini karşılamak** ve **stok takibi yapmak.**

* **Akıllı Müşteri Deneyimi:** Müşterilerimiz WhatsApp üzerinden ürün bilgisi veya sipariş durumu sorduğunda, asistanımız saniyeler içinde veritabanını tarayıp bir mağaza sorumlusu samimiyetiyle yanıt veriyor.
* **Veri Odaklı Yönetim:** İşletme sahibi, dashboard üzerinden hangi ürünün kritik stokta olduğunu veya güncel sipariş istatistiklerini anlık olarak görebiliyor.
* **Ölçeklenebilir Altyapı:** 50+ gerçekçi ürün ve 20+ aktif sipariş senaryosuyla test edilen sistemimiz, yüksek hacimli verileri işleyecek bir mimariye sahiptir.

---

## 🚀 Prototip Özellikleri 

Geliştirdiğimiz çözüm, bir işletmenin dijital dönüşümünü tamamlayacak şu temel sütunlar üzerine inşa edilmiştir:

* **AI Chatbot (WhatsApp & Web):** Gemini 2.0 Flash modeli ile güçlendirilen asistanımız, müşteri sorularını sadece yanıtlamakla kalmaz; kişiselleştirilmiş ürün önerileri sunar.
* **Dinamik Envanter Yönetimi:** Stok hareketlerini saniyeler içinde analiz ederek veritabanı ve dashboard üzerinde güncelliği sağlar.
* **Akıllı Sipariş Sorgulama:** Müşteriler, sadece sipariş numaralarını yazarak kargo durumlarını ve tahmini teslimat sürelerini doğal dilde öğrenebilirler.
* **Kritik Stok Uyarı Sistemi:** Kritik eşiğin altına düşen ürünler için sistem otomatik olarak uyarı bayrağı kaldırarak işletme sahibini bilgilendirir.
* **Yönetici Dashboard API:** Sipariş istatistiklerini ve operasyonel verileri özetleyen uç noktalar (endpoints) ile stratejik kararları kolaylaştırır.

---

## Sistem Mimari ve Teknolojik Yaklaşımımız

Sistemi kurarken hız, güvenlik ve esnekliği ön planda tuttuk:

* **Backend:** Modern ve asenkron yapısı nedeniyle **FastAPI** tercih edilmiştir.
* **Veritabanı Katmanı:** Veriler **SQLAlchemy ORM** aracılığıyla yönetilerek standart ve güvenli bir veri yapısı oluşturulmuştur.
* **Yapay Zeka (AI Agent):** Projenin kalbinde **Google Gemini 2.0 Flash** modeli yer alıyor. Model, fonksiyon çağırabilen (**Function Calling**) bir ajan olarak kurgulanmıştır.
* **Veri Entegrasyonu:** `products.csv` ve `orders.csv` dosyalarından beslenen dinamik yapı sayesinde hızlı veri güncellemesi desteklenmektedir.

---

## 🧠 Yapay Zeka Yaklaşımımız

1.  **Fonksiyonel Yetkilendirme:** Model, veritabanına erişmek için bizim tanımladığımız özel araçları kullanarak bilgi uydurma (halüsinasyon) riskini minimize eder.
2.  **Özel Talimatlar (System Instructions):** Asistanımıza profesyonel ve çözüm odaklı bir karakter tanımlanarak markanın dijital yüzü olması sağlanmıştır.
3.  **Hata Yönetimi:** API kota limitlerini ve bağlantı hatalarını yakalayan mekanizmalar ile kesintisiz kullanıcı deneyimi hedeflenmiştir.

---

## 🛠️ Kurulum ve Çalıştırma

### 1. Gereksinimler
* **Python 3.9+**
* **Google Gemini API Key**
* **Ngrok** (Opsiyonel, Webhook testleri için)

### 2. Adımlar

```bash
# 1. Depoyu klonlayın
git clone https://github.com/Rabianur1/kobi-otomasyon-hackathon.git
cd kobi-otomasyon-hackathon

# 2. Sanal ortam oluşturun ve aktif edin
python -m venv venv
# Windows için:
.\venv\Scripts\activate

# 3. Gerekli kütüphaneleri yükleyin
pip install -r requirements.txt

# 4. .env dosyasını oluşturun ve API anahtarınızı ekleyin
echo GEMINI_API_KEY=your_key_here > .env

# 5. Uygulamayı başlatın
python run.py
```

### 🔑 API Anahtarı Nasıl Alınır?

Sistemin yapay zeka özelliklerini kullanabilmek için bir Google Gemini API anahtarına ihtiyacınız vardır:

1.  **[Google AI Studio](https://aistudio.google.com/)** adresine gidin.
2.  Google hesabınızla giriş yapın.
3.  Sol menüdeki **"Get API key"** butonuna tıklayın.
4.  **"Create API key in new project"** seçeneğiyle yeni anahtarınızı oluşturun.
5.  Oluşturduğunuz anahtarı kopyalayın ve projenizdeki `.env` dosyasına `GEMINI_API_KEY=buraya_yapıştırın` şeklinde ekleyin.

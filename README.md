# 🤖 SmartKOBİ: Yapay Zeka Destekli Yeni Nesil İşletme Asistanı

![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-Modern--Framework-green.svg)
![Gemini](https://img.shields.io/badge/Google-Gemini%202.0%20Flash-orange.svg)

**SmartKOBİ**, geleneksel işletme yönetimini bir adım öteye taşıyarak, KOBİ'lerin müşteri ilişkilerini ve stok süreçlerini tek bir merkezden, yapay zeka ile yönetmesini sağlayan bir prototiptir. Amacımız, işletme sahiplerinin operasyonel yükünü azaltırken, müşterilere 7/24 kesintisiz ve akıllı bir hizmet sunmaktır.

---

## 🌟 Neden SmartKOBİ?

Projemiz, bir işletmenin günlük hayatta en çok vakit harcadığı iki temel soruna odaklanıyor: **Müşteri taleplerini karşılamak** ve **stok takibi yapmak.**

* **Akıllı Müşteri Deneyimi:** Müşterilerimiz WhatsApp üzerinden "Zeytinyağı fiyatı nedir?" veya "Siparişim nerede?" gibi sorular sorduğunda, asistanımız saniyeler içinde veritabanını tarayıp bir mağaza sorumlusu samimiyetiyle yanıt veriyor.
* **Veri Odaklı Yönetim:** İşletme sahibi, dashboard üzerinden hangi ürünün kritik stokta olduğunu veya güncel sipariş istatistiklerini anlık olarak görebiliyor.
* **Ölçeklenebilir Altyapı:** Şu an 50+ gerçekçi ürün ve 20+ aktif sipariş senaryosuyla test edilen sistemimiz, binlerce veriyi işleyecek bir mimariye sahip.

---

## 🚀 Prototip Özellikleri

Geliştirdiğimiz çözüm, bir işletmenin dijital dönüşümünü tamamlayacak şu temel sütunlar üzerine inşa edilmiştir:

* **AI Chatbot (WhatsApp & Web):** Gemini 2.0 Flash modeli ile güçlendirilen asistanımız, müşteri sorularını sadece yanıtlamakla kalmaz; bir mağaza görevlisi nezaketinde kişiselleştirilmiş öneriler sunar.
* **Dinamik Envanter Yönetimi:** 50'den fazla gerçekçi ürün verisi üzerinde çalışan sistem, stok hareketlerini saniyeler içinde analiz ederek dashboard'a yansıtır.
* **Akıllı Sipariş Sorgulama:** Müşteriler karmaşık menülerle uğraşmak yerine, sadece sipariş numaralarını yazarak kargo durumlarını ve tahmini teslimat sürelerini doğal dilde öğrenebilirler.
* **Kritik Stok Uyarı Sistemi:** Ürün bazlı tanımlanan kritik eşiklerin (Safe Stock) altına düşen ürünler için sistem otomatik olarak "Kritik Uyarı" bayrağı kaldırarak işletme sahibini uyarır.
* **Yönetici Dashboard API:** Sipariş istatistiklerini, en çok satan ürünleri ve operasyonel verileri özetleyen uç noktalar (endpoints) sayesinde işletme kararları veri odaklı hale getirilir.

---

## Sistem Mimari ve Teknolojik Yaklaşımımız

Sistemi kurarken hız, güvenlik ve esnekliği ön planda tuttuk:

* **Backend:** Modern, asenkron ve yüksek performanslı yapısı nedeniyle **FastAPI** tercih ettik.
* **Veritabanı Katmanı:** Verilerimizi **SQLAlchemy ORM** aracılığıyla yönettik. Bu sayede veritabanı işlemlerini daha güvenli ve standart hale getirdik.
* **Yapay Zeka (AI Agent):** Projenin kalbinde **Google Gemini 2.0 Flash** modeli yer alıyor. Modeli sadece bir metin üreticisi olarak değil, fonksiyon çağırabilen (**Function Calling**) bir ajan olarak kurguladık.
* **Veri Entegrasyonu:** `products.csv` ve `orders.csv` dosyalarından dinamik olarak beslenen bir yapı kurduk. Bu sayede veritabanını manuel yönetmek yerine, dosya bazlı hızlı güncellemeler yapabiliyoruz.

---

## 🧠 Yapay Zeka Yaklaşımımız

Yapay zekayı sisteme entegre ederken şu stratejileri uyguladık:

1.  **Fonksiyonel Yetkilendirme:** Model, veritabanına doğrudan erişmek yerine bizim tanımladığımız `check_order_status` ve `get_product_info` gibi araçları kullanıyor. Bu, veri güvenliğini sağlarken modelin halüsinasyon görmesini engelliyor.
2.  **Özel Talimatlar (System Instructions):** Asistanımıza "nazik, profesyonel ve çözüm odaklı" bir karakter tanımladık. Bir bot gibi değil, markanın dijital yüzü gibi davranmasını sağladık.
3.  **Hata Yönetimi:** Ücretsiz API kotalarını ve olası bağlantı hatalarını yakalayan bir mekanizma kurarak, kullanıcılara hata anında bile bilgilendirici mesajlar döndürülmesini sağladık.

---

## 🛠️ Kurulum ve Çalıştırma

### 1. Gereksinimler
* **Python 3.9+**
* **Google Gemini API Key**
* **Ngrok** (Opsiyonel, Webhook testleri için)

### 2. Adımlar
```bash
# 1. Depoyu klonlayın
git clone [https://github.com/kullaniciadi/kobi-otomasyon-hackathon.git](https://github.com/kullaniciadi/kobi-otomasyon-hackathon.git)
cd kobi-otomasyon-hackathon

# 2. Sanal ortam oluşturun ve aktif edin
python -m venv venv
# Windows için:
.\venv\Scripts\activate
# macOS/Linux için:
# source venv/bin/activate

# 3. Gerekli kütüphaneleri yükleyin
pip install -r requirements.txt

# 4. .env dosyasını oluşturun ve API anahtarınızı ekleyin
# (Veya manuel olarak .env dosyası açıp GEMINI_API_KEY=key_buraya yazın)
echo GEMINI_API_KEY=your_key_here > .env

# 5. Uygulamayı başlatın
python run.py

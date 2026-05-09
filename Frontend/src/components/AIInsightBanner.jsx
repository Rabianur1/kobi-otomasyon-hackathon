function AIInsightBanner() {
  return (
    <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-sm">
      <p className="text-sm text-blue-100 mb-2">
        AI Günlük Operasyon Özeti
      </p>

      <h2 className="text-2xl font-bold">
        Bugün sipariş ve stok süreçleri genel olarak stabil görünüyor.
      </h2>

      <p className="mt-3 text-blue-100">
        3 sipariş aktif takipte, 2 ürün kritik stok seviyesine yakın.
        Müşteri iletişiminde en sık sorulan konu teslimat durumu.
      </p>
    </div>
  )
}

export default AIInsightBanner
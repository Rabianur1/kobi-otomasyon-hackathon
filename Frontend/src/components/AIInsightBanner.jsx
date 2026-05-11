import { useEffect, useState } from "react"

function AIInsightBanner() {
  const [summary, setSummary] = useState(null)
  const [criticalProducts, setCriticalProducts] = useState([])
  const [messageAnalysis, setMessageAnalysis] = useState(null)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard/summary")
      .then((response) => response.json())
      .then((data) => {
        setSummary(data.summary)
        setCriticalProducts(data.kritik_stok_uyarilari || [])
      })
      .catch((error) => {
        console.error("AI özet verisi alınamadı:", error)
      })

    fetch("http://127.0.0.1:8000/api/messages/analysis")
      .then((response) => response.json())
      .then((data) => {
        setMessageAnalysis(data)
      })
      .catch((error) => {
        console.error("Mesaj analizi alınamadı:", error)
      })
  }, [])

  if (!summary || !messageAnalysis) {
    return null
  }

  return (
    <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-sm">
      <p className="text-sm text-blue-100 mb-2">
        AI Günlük Operasyon Özeti
      </p>

      <h2 className="text-2xl font-bold">
        Bugün toplam {summary.toplam_siparis} sipariş sistem tarafından takip ediliyor.
      </h2>

      <p className="mt-3 text-blue-100">
        {summary.kargodaki_siparis} sipariş aktif teslimat sürecinde.{" "}
        {criticalProducts.length} ürün kritik stok seviyesine yakın.{" "}
        {messageAnalysis.insight}
      </p>
    </div>
  )
}

export default AIInsightBanner
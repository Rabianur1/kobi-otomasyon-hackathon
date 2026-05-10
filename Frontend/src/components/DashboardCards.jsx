import { useEffect, useState } from "react"
import { Package, Clock, Truck, AlertTriangle } from "lucide-react"

function DashboardCards() {
  const [summary, setSummary] = useState(null)
  const [criticalProducts, setCriticalProducts] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard/summary")
      .then((response) => response.json())
      .then((data) => {
        const parsedSummary =
          typeof data.summary === "string"
            ? JSON.parse(data.summary)
            : data.summary

        setSummary(parsedSummary)
        setCriticalProducts(data.kritik_stok_uyarilari || [])
      })
      .catch((error) => {
        console.error("Dashboard verisi alınamadı:", error)
      })
  }, [])

  if (!summary) {
    return (
      <div className="mt-8 text-gray-500">
        Dashboard verileri yükleniyor...
      </div>
    )
  }

  const cards = [
    {
      title: "Toplam Sipariş",
      value: summary.toplam_siparis,
      icon: Package,
      color: "text-gray-700",
      bg: "bg-gray-100",
    },
    {
      title: "Hazırlanan Sipariş",
      value: summary.hazirlanan_siparis,
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      title: "Kargodaki Sipariş",
      value: summary.kargodaki_siparis,
      icon: Truck,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Kritik Stok",
      value: criticalProducts.length,
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <div
            key={card.title}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm">
                  {card.title}
                </h3>

                <p className={`text-3xl font-bold mt-3 ${card.color}`}>
                  {card.value}
                </p>
              </div>

              <div className={`p-3 rounded-xl ${card.bg}`}>
                <Icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DashboardCards
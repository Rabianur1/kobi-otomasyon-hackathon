import { useState, useEffect } from "react"
import { Package, Clock, Truck, AlertTriangle } from "lucide-react"

function DashboardCards() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Siparişler çekilemedi:", err))

    fetch('http://localhost:8000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Ürünler çekilemedi:", err))
  }, [])

  const totalOrders = orders.length

  const preparingOrders = orders.filter(
    (order) => order.status === "Hazırlanıyor"
  ).length

  const shippingOrders = orders.filter(
    (order) => order.status === "Kargoda"
  ).length

  const criticalStock = products.filter(
    (product) => product.stock < product.criticalStock
  ).length

  const cards = [
    {
      title: "Toplam Sipariş",
      value: totalOrders,
      icon: Package,
      color: "text-gray-700",
      bg: "bg-gray-100",
    },
    {
      title: "Hazırlanan Sipariş",
      value: preparingOrders,
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      title: "Kargodaki Sipariş",
      value: shippingOrders,
      icon: Truck,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Kritik Stok",
      value: criticalStock,
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
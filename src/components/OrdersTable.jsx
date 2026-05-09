import { useState, useEffect } from "react"

function OrdersTable() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Siparişler çekilemedi:", err))
  }, [])

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Son Siparişler
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="pb-3">Sipariş No</th>
              <th className="pb-3">Müşteri</th>
              <th className="pb-3">Ürün</th>
              <th className="pb-3">Durum</th>
              <th className="pb-3">Teslimat</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-none">
                <td className="py-4">#{order.id}</td>
                <td className="py-4">{order.customer}</td>
                <td className="py-4">{order.product}</td>

                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Kargoda"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "Hazırlanıyor"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="py-4">{order.estimatedDelivery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersTable
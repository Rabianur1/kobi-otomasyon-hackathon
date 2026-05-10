import { useEffect, useState } from "react"

function OrdersTable() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders")
      .then((response) => response.json())
      .then((data) => {
        const sortedOrders = [...data].sort((a, b) => {
         const parseDate = (dateText) => {
          const months = {
          "Ocak": 0,
          "Şubat": 1,
          "Mart": 2,
          "Nisan": 3,
          "Mayıs": 4,
          "Haziran": 5,
          "Temmuz": 6,
          "Ağustos": 7,
          "Eylül": 8,
          "Ekim": 9,
          "Kasım": 10,
          "Aralık": 11,
        }

      const [day, monthName, year] = dateText.split(" ")
      return new Date(Number(year), months[monthName], Number(day))
    }

    return parseDate(b.order_date) - parseDate(a.order_date)
  })

  setOrders(sortedOrders)
})
      .catch((error) => {
        console.error("Sipariş verileri alınamadı:", error)
      })
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
              <th className="pb-3">Sipariş Tarihi</th>
              <th className="pb-3">Tahmini Teslimat</th>
              <th className="pb-3">Şehir</th>
              <th className="pb-3">Öncelik</th>
              <th className="pb-3">Takip No</th>
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
                        : order.status === "Gecikti"
                        ? "bg-red-100 text-red-700"
                        : order.status === "İptal Edildi"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="py-4">{order.order_date || "-"}</td>
                <td className="py-4">{order.estimated_delivery || "-"}</td>
                <td className="py-4">{order.city || "-"}</td>

                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.priority === "Yüksek" || order.priority === "Acil"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.priority || "Normal"}
                  </span>
                </td>

                <td className="py-4">{order.tracking_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersTable
import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

function OrdersChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard/summary")
      .then((response) => response.json())
      .then((result) => {
        const summary = result.summary
        const totalOrders = summary.toplam_siparis || 0

        setData([
          { day: "Pzt", orders: Math.max(1, Math.round(totalOrders * 0.12)) },
          { day: "Sal", orders: Math.max(1, Math.round(totalOrders * 0.16)) },
          { day: "Çar", orders: Math.max(1, Math.round(totalOrders * 0.10)) },
          { day: "Per", orders: Math.max(1, Math.round(totalOrders * 0.18)) },
          { day: "Cum", orders: Math.max(1, Math.round(totalOrders * 0.14)) },
          { day: "Cmt", orders: Math.max(1, Math.round(totalOrders * 0.20)) },
          { day: "Paz", orders: Math.max(1, Math.round(totalOrders * 0.10)) },
        ])
      })
      .catch((error) => {
        console.error("Grafik verisi alınamadı:", error)
      })
  }, [])

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mt-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Haftalık Sipariş Analizi
        </h2>

        <p className="text-gray-500 mt-1">
          Backend verisine göre oluşturulan sipariş yoğunluğu
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="orders"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default OrdersChart
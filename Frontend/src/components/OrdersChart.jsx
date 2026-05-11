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
    fetch("http://127.0.0.1:8000/api/orders/weekly-analysis")
      .then((response) => response.json())
      .then((result) => {
        setData(result)
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
          Sipariş tarihlerine göre oluşturulan haftalık sipariş yoğunluğu
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
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
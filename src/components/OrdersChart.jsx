import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts"

const data = [
  { day: "Pzt", orders: 12 },
  { day: "Sal", orders: 18 },
  { day: "Çar", orders: 9 },
  { day: "Per", orders: 22 },
  { day: "Cum", orders: 17 },
  { day: "Cmt", orders: 28 },
  { day: "Paz", orders: 14 },
]

function OrdersChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mt-8">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Haftalık Sipariş Analizi
        </h2>

        <p className="text-gray-500 mt-1">
          Son 7 gündeki sipariş yoğunluğu
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
>
  </Line>

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default OrdersChart
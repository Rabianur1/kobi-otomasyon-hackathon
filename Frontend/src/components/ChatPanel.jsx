import { useState } from "react"
import { orders } from "../data/orders"

function ChatPanel({ onNewCustomerMessage }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const generateAIResponse = (userMessage) => {
    const orderNumber = userMessage.match(/\d+/)?.[0]

    if (orderNumber) {
      const foundOrder = orders.find((order) => order.id === orderNumber)

      if (foundOrder) {
        return `#${foundOrder.id} numaralı siparişiniz ${foundOrder.status.toLowerCase()} durumunda. Ürün: ${foundOrder.product}. Tahmini teslimat tarihi: ${foundOrder.estimatedDelivery}.`
      }

      return `#${orderNumber} numaralı bir sipariş bulunamadı. Lütfen sipariş numarasını kontrol ediniz.`
    }

    return "Siparişinizi kontrol edebilmem için lütfen sipariş numaranızı paylaşınız."
  }

  const handleSend = () => {
    if (input.trim() === "") return

    const newMessage = {
      sender: "customer",
      text: input,
    }

    if (onNewCustomerMessage) {
      onNewCustomerMessage(input)
    }

    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setInput("")

    setTimeout(() => {
      const aiResponse = {
        sender: "ai",
        text: generateAIResponse(input),
      }

      setMessages([...updatedMessages, aiResponse])
    }, 1000)
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Müşteri Takip Asistanı
      </h2>

      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {messages.length === 0 && (
          <div className="bg-gray-100 p-4 rounded-xl text-gray-500">
            Sipariş durumunuzu öğrenmek için sipariş numaranızı yazabilirsiniz.
            Örnek: 128 numaralı siparişim nerede?
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl ${
              message.sender === "customer"
                ? "bg-gray-100"
                : "bg-blue-600 text-white"
            }`}
          >
            <p className="text-sm mb-1 opacity-70">
              {message.sender === "customer" ? "Müşteri" : "SmartOps AI"}
            </p>

            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <input
          type="text"
          placeholder="Sipariş numarası yaz..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend()
            }
          }}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-5 rounded-xl hover:bg-blue-700"
        >
          Gönder
        </button>
      </div>
    </div>
  )
}

export default ChatPanel
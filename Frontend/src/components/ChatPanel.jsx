import { useState } from "react"

function ChatPanel({ onNewCustomerMessage }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (input.trim() === "") return

    const userText = input

    const newMessage = {
      sender: "customer",
      text: userText,
    }

    if (onNewCustomerMessage) {
      onNewCustomerMessage(userText)
    }

    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          customer_id: 1,
        }),
      })

      const data = await response.json()

      const aiResponse = {
        sender: "ai",
        text: data.response || data.answer || "Yanıt alınamadı.",
      }

      setMessages([...updatedMessages, aiResponse])
    } catch (error) {
      const errorMessage = {
        sender: "ai",
        text: "Backend bağlantısında bir sorun oluştu. Lütfen backend'in çalıştığından emin olun.",
      }

      setMessages([...updatedMessages, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        AI Müşteri Asistanı
      </h2>

      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {messages.length === 0 && (
          <div className="bg-gray-100 p-4 rounded-xl text-gray-500">
            Sipariş durumu, stok bilgisi, ürün fiyatı veya teslimat süreci hakkında soru sorabilirsiniz.
            
            Örnek: 12 numaralı siparişim nerede? / Karakovan balı stokta var mı?
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

        {loading && (
          <div className="bg-blue-600 text-white p-4 rounded-xl">
            <p className="text-sm mb-1 opacity-70">SmartOps AI</p>
            <p>Yanıt hazırlanıyor...</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <input
          type="text"
          placeholder="Sipariş, ürün veya stok hakkında soru sorun..."
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
          disabled={loading}
          className="bg-blue-600 text-white px-5 rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          Gönder
        </button>
      </div>
    </div>
  )
}

export default ChatPanel
import { useState } from "react"

function ChatPanel({ onNewCustomerMessage }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false) 

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

    setMessages((prev) => [...prev, newMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userText, customer_id: 1}),
      })

      const data = await response.json()
      console.log("Backend'den gelen ham veri:", data)
      
      const aiResponse = {
        sender: "ai",
        text: data.response || "Asistan yanıtı alınamadı.",
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error("Chat API Hatası:", error)
      const errorResponse = {
        sender: "ai",
        text: "Sunucuya ulaşılamıyor. Lütfen backend'in açık olduğundan emin olun."
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Müşteri Takip Asistanı
      </h2>

      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {messages.length === 0 && (
          <div className="bg-gray-100 p-4 rounded-xl text-gray-500">
            Sipariş durumunuzu öğrenmek veya ürünlerimiz hakkında bilgi almak için bana yazabilirsiniz.
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
        
        {/* Asistan düşünürken animasyon göster */}
        {isLoading && (
          <div className="p-4 rounded-xl bg-blue-600 text-white opacity-70">
            <p className="text-sm mb-1 opacity-70">SmartOps AI</p>
            <p className="animate-pulse">Düşünüyor...</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <input
          type="text"
          placeholder="Mesajınızı yazın..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isLoading) {
              handleSend()
            }
          }}
          disabled={isLoading}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />

        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-blue-600 text-white px-5 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {isLoading ? "Bekleyin" : "Gönder"}
        </button>
      </div>
    </div>
  )
}

export default ChatPanel
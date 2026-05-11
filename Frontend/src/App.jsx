import { useState } from "react"
import Sidebar from "./components/Sidebar"
import DashboardCards from "./components/DashboardCards"
import OrdersTable from "./components/OrdersTable"
import ProductTable from "./components/ProductTable"
import ChatPanel from "./components/ChatPanel"
import AIInsightBanner from "./components/AIInsightBanner"
import AIAlert from "./components/AIAlert"
import OrdersChart from "./components/OrdersChart"

function App() {
  const [userMode, setUserMode] = useState(null)
  const [activePage, setActivePage] = useState("dashboard")

  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const [customerMessages, setCustomerMessages] = useState([])

  if (userMode === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800">
              SmartOps AI
            </h1>

            <p className="text-gray-500 mt-3">
              KOBİ’ler için AI destekli müşteri iletişimi ve sipariş takip sistemi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setUserMode("seller")}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition text-left"
            >
              <h2 className="text-2xl font-bold text-gray-800">
                Satıcı Paneli
              </h2>

              <p className="text-gray-500 mt-3">
                Siparişleri, ürünleri, stok durumunu ve müşteri mesajlarını yönetin.
              </p>

              <p className="mt-6 text-blue-600 font-semibold">
                Panele Gir →
              </p>
            </button>

            <button
              onClick={() => setUserMode("customer")}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition text-left"
            >
              <h2 className="text-2xl font-bold text-gray-800">
                AI Müşteri Asistanı
              </h2>

              <p className="text-gray-500 mt-3">
                Sipariş durumu, stok bilgisi, ürün detayları ve teslimat süreçleri hakkında AI destekli anlık destek alın.
              </p>

              <p className="mt-6 text-blue-600 font-semibold">
                Asistanı Başlat →
              </p>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (userMode === "customer") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="w-full max-w-xl">
          <button
            onClick={() => setUserMode(null)}
            className="mb-6 text-blue-600 font-medium"
          >
            ← Ana ekrana dön
          </button>

          <ChatPanel
            onNewCustomerMessage={(message) =>
              setCustomerMessages([
                ...customerMessages,
                {
                  customer: "Demo Müşteri",
                  message: message,
                  time: new Date().toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ])
            }
          />
        </div>
      </div>
    )
  }

  if (userMode === "seller" && !isSellerLoggedIn) {
    const handleLogin = () => {
      if (username === "admin" && password === "1234") {
        setIsSellerLoggedIn(true)
        setLoginError("")
      } else {
        setLoginError("Kullanıcı adı veya şifre hatalı.")
      }
    }

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md">
          <button
            onClick={() => setUserMode(null)}
            className="mb-6 text-blue-600 font-medium"
          >
            ← Ana ekrana dön
          </button>

          <h1 className="text-3xl font-bold text-gray-800">
            Satıcı Girişi
          </h1>

          <p className="text-gray-500 mt-2">
            Yönetim paneline erişmek için giriş yapın.
          </p>

          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Kullanıcı adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {loginError && (
              <p className="text-red-500 text-sm">
                {loginError}
              </p>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              Giriş Yap
            </button>

            <p className="text-xs text-gray-400">
              Demo giriş bilgileri: admin / 1234
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        setUserMode={setUserMode}
      />

      <main className="flex-1 p-8">
        {activePage === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Satıcı operasyonları için genel durum özeti
            </p>

            <DashboardCards />
            <AIInsightBanner />
            <AIAlert />
            <OrdersChart />
          </>
        )}

        {activePage === "orders" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800">
              Siparişler
            </h1>

            <p className="text-gray-500 mt-2">
              Müşteri siparişlerini ve teslimat durumlarını takip edin.
            </p>

            <OrdersTable />
          </>
        )}

        {activePage === "products" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800">
              Ürünler
            </h1>

            <p className="text-gray-500 mt-2">
              Ürün stoklarını ve kritik seviyeleri görüntüleyin.
            </p>

            <ProductTable />
          </>
        )}

        {activePage === "messages" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800">
              Müşteri Mesajları
            </h1>

            <p className="text-gray-500 mt-2">
              Müşteri asistanı üzerinden gelen sipariş sorgularını ve sistem yanıtlarını görüntüleyin.
            </p>

            <div className="bg-white p-6 rounded-2xl shadow-sm mt-8">
              {customerMessages.length === 0 ? (
                <p className="text-gray-500">
                  Henüz müşteri mesajı bulunmuyor.
                </p>
              ) : (
                <div className="space-y-4">
                  {customerMessages.map((item, index) => (
                    <div key={index} className="border-b last:border-none pb-4">
                      <div className="flex justify-between">
                        <p className="font-semibold text-gray-800">
                          {item.customer}
                        </p>

                        <p className="text-sm text-gray-400">
                          {item.time}
                        </p>
                      </div>

                      <p className="text-gray-500 mt-2">
                        “{item.message}”
                      </p>

                      <p className="mt-3 bg-blue-50 text-blue-700 p-4 rounded-xl">
                        SmartOps AI tarafından otomatik yanıtlandı.
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App
import { LayoutDashboard, Package, ShoppingCart, MessageSquare } from "lucide-react"
function Sidebar({ activePage, setActivePage, setUserMode }) {
  const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "Siparişler", icon: ShoppingCart },
  { id: "products", label: "Ürünler", icon: Package },
  { id: "messages", label: "Müşteri Mesajları", icon: MessageSquare },
]

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <div className="mb-10">
        <h2 className="text-2xl font-bold">SmartOps AI</h2>
        <p className="text-slate-400 text-sm mt-1">Satıcı Paneli</p>
      </div>

      <nav className="space-y-3">
        {menuItems.map((item) => {
  const Icon = item.icon

  return (
    <button
      key={item.id}
      onClick={() => setActivePage(item.id)}
      className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl transition ${
        activePage === item.id
          ? "bg-blue-600 text-white"
          : "text-slate-300 hover:bg-slate-800"
      }`}
    >
      <Icon className="w-5 h-5" />
      {item.label}
    </button>
  )
})}
      </nav>

      <button
        onClick={() => setUserMode(null)}
        className="mt-10 w-full text-left text-slate-300 hover:bg-slate-800 px-4 py-3 rounded-xl"
      >
        Çıkış / Mod Değiştir
      </button>
    </aside>
  )
}

export default Sidebar
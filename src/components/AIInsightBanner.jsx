import { useState, useEffect } from "react"

function AIInsightBanner() {
  const [activeOrdersCount, setActiveOrdersCount] = useState(0)
  const [criticalStockCount, setCriticalStockCount] = useState(0)

  useEffect(() => {
    fetch('http://localhost:8000/api/orders')
      .then(res => res.json())
      .then(data => {
        const active = data.filter(order => order.status === "Hazırlanıyor" || order.status === "Kargoda").length;
        setActiveOrdersCount(active);
      })
      .catch(err => console.error("Siparişler çekilemedi:", err));

    fetch('http://localhost:8000/api/products')
      .then(res => res.json())
      .then(data => {
        const critical = data.filter(product => product.stock < product.criticalStock).length;
        setCriticalStockCount(critical);
      })
      .catch(err => console.error("Ürünler çekilemedi:", err));
  }, [])

  const isSystemStable = criticalStockCount === 0;

  return (
    <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-sm">
      <p className="text-sm text-blue-100 mb-2">
        SmartOps AI - Günlük Operasyon Özeti
      </p>

      <h2 className="text-2xl font-bold">
        {isSystemStable 
          ? "Bugün sipariş ve stok süreçleri genel olarak stabil görünüyor." 
          : "Dikkat: Operasyonlarda müdahale edilmesi gereken kritik stok uyarıları mevcut!"}
      </h2>

      <p className="mt-3 text-blue-100">
        {activeOrdersCount} sipariş aktif olarak işleniyor, {criticalStockCount} ürün kritik stok seviyesinde. 
        Müşteri iletişiminde akıllı asistanınız 7/24 devrede.
      </p>
    </div>
  )
}

export default AIInsightBanner
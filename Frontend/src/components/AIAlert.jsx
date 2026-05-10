import { useEffect, useState } from "react"

function AIAlert() {
  const [criticalProducts, setCriticalProducts] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard/summary")
      .then((response) => response.json())
      .then((data) => {
        setCriticalProducts(data.kritik_stok_uyarilari || [])
      })
      .catch((error) => {
        console.error("Kritik stok verisi alınamadı:", error)
      })
  }, [])

  if (criticalProducts.length === 0) {
    return null
  }

  return (
    <div className="mt-8 bg-red-50 border border-red-200 p-5 rounded-2xl">
      <h2 className="text-lg font-bold text-red-700">
        Kritik Stok Bildirimi
      </h2>

      <p className="text-red-600 mt-2">
        {criticalProducts
          .map((product) => product.urun_adi)
          .join(", ")}{" "}
        kritik stok seviyesinin altında.
        Stok yenileme sürecinin başlatılması önerilir.
      </p>
    </div>
  )
}

export default AIAlert
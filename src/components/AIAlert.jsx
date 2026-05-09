import { useState, useEffect } from "react"

function AIAlert() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Ürünler çekilemedi:", err))
  }, [])

  const criticalProducts = products.filter(
    (product) => product.stock < product.criticalStock
  )

  if (criticalProducts.length === 0) {
    return null
  }

  return (
    <div className="mt-8 bg-red-50 border border-red-200 p-5 rounded-2xl">
      <h2 className="text-lg font-bold text-red-700">
        Kritik Stok Bildirimi
      </h2>

      <p className="text-red-600 mt-2">
        {criticalProducts.map((product) => product.name).join(", ")} kritik stok seviyesinin altında.
        Stok yenileme sürecinin başlatılması önerilir.
      </p>
    </div>
  )
}

export default AIAlert
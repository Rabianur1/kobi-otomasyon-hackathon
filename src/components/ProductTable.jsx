import { products } from "../data/products"

function ProductTable() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mt-8">

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Ürün & Stok Durumu
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>
            <tr className="text-gray-500 border-b">

              <th className="pb-3">Ürün ID</th>
              <th className="pb-3">Ürün</th>
              <th className="pb-3">Stok</th>
              <th className="pb-3">Kritik Seviye</th>
              <th className="pb-3">Fiyat</th>

            </tr>
          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-b last:border-none"
              >

                <td className="py-4">
                  {product.id}
                </td>

                <td className="py-4">
                  {product.name}
                </td>

                <td
                  className={`py-4 font-semibold ${
                    product.stock < product.criticalStock
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {product.stock}
                </td>

                <td className="py-4">
                  {product.criticalStock}
                </td>

                <td className="py-4">
                  {product.price}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default ProductTable
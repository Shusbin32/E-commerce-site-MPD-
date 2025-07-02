export default function ProductList({ products, addToCart }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-green-700 mb-4">🛍 Grocery Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="text-lg font-semibold text-gray-800">{product.name}</div>
            <div className="text-gray-600 mb-2">
              Rs. {product.price} /{product.unit}
            </div>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded-lg text-sm"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

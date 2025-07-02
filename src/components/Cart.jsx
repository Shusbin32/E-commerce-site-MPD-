import React from 'react';

export default function Cart({ cartItems = [], increaseQty, decreaseQty, removeItem }) {
  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
        <span role="img" aria-label="cart">🛒</span> Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">No items in cart.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            const itemTotal = price * quantity;

            return (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/80 p-5 rounded-2xl shadow-lg border border-green-100 transition-all duration-200 hover:shadow-green-200"
              >
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-green-900">{item.name}</span>
                  <span className="text-gray-700 text-sm mt-1">
                    Rs.{price} <span className="text-xs text-gray-500">/{item.unit}</span> × {quantity} = <strong className="text-blue-700">Rs.{itemTotal}</strong>
                  </span>
                </div>

                <div className="mt-4 sm:mt-0 flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-9 h-9 flex items-center justify-center bg-yellow-100 hover:bg-yellow-300 active:bg-yellow-400 text-yellow-800 text-xl font-bold rounded-full shadow transition-all duration-150 border border-yellow-300"
                    aria-label="Decrease quantity"
                  >
                    –
                  </button>
                  <span className="px-2 text-lg font-semibold text-gray-800">{quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-9 h-9 flex items-center justify-center bg-green-100 hover:bg-green-300 active:bg-green-400 text-green-800 text-xl font-bold rounded-full shadow transition-all duration-150 border border-green-300"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-9 h-9 flex items-center justify-center bg-red-100 hover:bg-red-300 active:bg-red-400 text-red-700 text-xl font-bold rounded-full shadow transition-all duration-150 border border-red-300 ml-2"
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {cartItems.length > 0 && (
        <>
          <h3 className="text-xl font-semibold text-right mt-8">
            Total: <span className="text-green-700">Rs.{total}</span>
          </h3>
          <form
            method="POST"
            action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
            className="flex justify-end mt-6"
          >
            <input type="hidden" name="amount" value={total} />
            <input type="hidden" name="tax_amount" value="0" />
            <input type="hidden" name="total_amount" value={total} />
            <input type="hidden" name="transaction_uuid" value={Date.now()} />
            <input type="hidden" name="product_code" value="EPAYTEST" />
            <input type="hidden" name="product_service_charge" value="0" />
            <input type="hidden" name="product_delivery_charge" value="0" />
            <input type="hidden" name="success_url" value="http://localhost:3000/esewa-success" />
            <input type="hidden" name="failure_url" value="http://localhost:3000/esewa-failure" />
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-200"
            >
              Pay with eSewa
            </button>
          </form>
        </>
      )}
    </div>
  );
}

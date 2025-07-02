import React from 'react';
import Cart from '../components/Cart';
import { toast } from 'react-toastify';


export default function CartPage({ cartItems, setCartItems }) {
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.error('Item removed from cart');
  };

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">🛒 Your Shopping Cart</h2>
        <Cart
          cartItems={cartItems}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          removeItem={removeItem}
        />
      </div>
    </div>
  );
}

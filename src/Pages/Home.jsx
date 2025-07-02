import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { toast } from 'react-toastify';
import api from '../utils/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        toast.error('Failed to load products from server');
      });
  }, []);

  // Fetch cart from backend
  useEffect(() => {
    api.get('/cart')
      .then((res) => setCartItems(res.data))
      .catch((err) => {
        console.error('Failed to fetch cart:', err);
        toast.error('Failed to load cart from server');
      });
  }, []);

  // Add to cart and update backend
  const addToCart = async (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product._id);
      let updatedCart;
      if (exists) {
        updatedCart = prev.map(item =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...prev,
          {
            id: product._id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            quantity: 1,
          },
        ];
      }
      api.put('/cart', updatedCart).catch(() => {
        toast.error('Failed to update cart on server');
      });
      return updatedCart;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white px-0 py-0">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-green-400 via-blue-300 to-blue-500 py-16 mb-10 shadow-lg">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            Welcome to <span className="text-yellow-200">Machhapuchhrey</span> Store
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
            Fresh dairy & groceries, delivered with care. Discover our best products below!
          </p>
          <a
            href="#products"
            className="inline-block bg-white text-blue-700 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-blue-50 transition"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Product Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center tracking-tight">
          Our Featured Products
        </h2>
        <div className="animate-fade-in">
          <ProductList products={products} addToCart={addToCart} />
        </div>
      </section>

      {/* Custom CSS for fade-in */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}

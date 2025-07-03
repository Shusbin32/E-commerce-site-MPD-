import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCartPlus } from 'react-icons/fa';

export default function OurProducts({ addToCart, loggedIn }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error('Failed to load products:', err);
        toast.error('Failed to load products from server');
      });
  }, []);

  const handleAddToCart = (product) => {
    if (!loggedIn) {
      toast.warning('Please log in to add items to your cart');
      navigate('/login');
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="relative px-6 py-10 bg-gradient-to-br from-green-50 via-blue-50 to-blue-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-green-800 mb-12 drop-shadow-lg">
        Our Products
      </h1>

      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } }
          }}
        >
          {products.map((product, idx) => (
            <motion.div
              key={product._id}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(16,185,129,0.15)" }}
              className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-7 flex flex-col items-center transition-all duration-300 hover:shadow-green-200"
              style={{
                minHeight: 320,
                boxShadow: "0 4px 24px rgba(59,130,246,0.07)"
              }}
            >
              <div className="flex justify-center mb-4 w-full">
                <img
      
              src={product.imagePath}
               alt={product.name}
                 className="h-28 w-28 object-cover rounded-full border-4 border-green-100 shadow"
                  onError={e => { e.target.onerror = null; e.target.src = '/resources/placeholder.png'; }}
                />
              </div>
              <h3 className="text-2xl font-bold text-green-900 text-center mb-1">{product.name}</h3>
              <p className="text-center text-base text-gray-600 mb-2">
                {product.description?.slice(0, 50)}
                {product.description?.length > 50 ? '...' : ''}
              </p>
              <div className="text-blue-700 font-semibold mb-4 text-center text-lg">
                Rs. {product.price} <span className="text-xs text-gray-500">/ {product.unit}</span>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-2 rounded-full text-base font-semibold shadow flex items-center gap-2 transition"
              >
                <FaCartPlus className="text-lg" /> Add to Cart
              </button>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

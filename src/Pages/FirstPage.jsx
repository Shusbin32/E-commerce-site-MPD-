import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const images = [
  '/resources/backgdairy.png',
  '/resources/unnamed.png',
  '/resources/dd.png',
  '/resources/ff.png',
];

export default function FirstPage() {
  const [index, setIndex] = useState(0);
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    api.get('/products')
      .then(res => {
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        setFeatured(shuffled.slice(0, 3));
      })
      .catch(() => setFeatured([]));
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${images[index]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        style={{
          background: 'linear-gradient(120deg, rgba(16, 185, 129, 0.7) 0%, rgba(59, 130, 246, 0.5) 100%)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Floating Decorative Circles */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 rounded-full bg-green-300/30 blur-2xl z-0"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-blue-300/30 blur-2xl z-0"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      {/* Welcome Section */}
      <div className="relative z-10 flex flex-col items-center mt-24 mb-10 px-4 w-full">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-2xl mb-4"
          style={{ textShadow: '0 4px 32px rgba(0,0,0,0.25)' }}
        >
          Welcome to <span className="text-green-200">Machhapuchhrey Dairy & Grocery</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-white/90 text-xl md:text-2xl text-center font-medium mb-2"
        >
          Local freshness, trusted quality.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-white/80 text-lg md:text-xl text-center mb-8"
        >
          Your go-to store for dairy and groceries straight from ethical farms.
        </motion.p>
        <motion.button
          onClick={() => navigate('/our-products')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-10 py-4 rounded-full shadow-lg text-xl font-bold transition duration-300"
        >
          Browse All Products →
        </motion.button>
      </div>

      {/* Featured Products - Glassmorphism & Dynamic Layout */}
      <AnimatePresence>
        {featured.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="relative z-10 flex flex-col md:flex-row gap-8 justify-center items-center w-full px-4"
          >
            {featured.map((product, i) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.07, rotate: -2 + i * 2 }}
                className="bg-white/30 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-6 w-full md:w-80 flex flex-col items-center transition-all duration-300 hover:shadow-2xl"
                style={{
                  marginTop: i % 2 === 0 ? 0 : 32,
                  marginBottom: i % 2 === 1 ? 0 : 32,
                  zIndex: 10 - i,
                }}
              >
                <img
                  src={product.imagePath ? `http://localhost:5000/${product.imagePath.replace(/\\/g, '/')}` : '/resources/placeholder.png'}
                  alt={product.name}
                  className="h-28 w-28 object-cover rounded-full mb-4 border-4 border-green-100 shadow"
                />
                <div className="text-xl font-bold text-green-900 mb-1 text-center">{product.name}</div>
                <div className="text-gray-700 mb-1 text-center">{product.description?.slice(0, 40)}{product.description?.length > 40 ? '...' : ''}</div>
                <div className="text-blue-700 font-semibold mb-2 text-center">
                  Rs. {product.price} <span className="text-xs text-gray-500">/{product.unit}</span>
                </div>
                <button
                  onClick={() => navigate('/our-products')}
                  className="mt-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white py-1 px-4 rounded-lg text-sm shadow transition"
                >
                  View All Products
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

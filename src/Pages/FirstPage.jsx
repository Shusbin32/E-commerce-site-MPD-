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
        className="absolute top-4 left-4 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-green-300/30 blur-2xl z-0"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-blue-300/30 blur-2xl z-0"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      {/* Welcome Section */}
      <div className="relative z-10 flex flex-col items-center mt-16 md:mt-24 mb-8 md:mb-10 px-2 sm:px-4 w-full max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-2xl mb-3 md:mb-4"
          style={{ textShadow: '0 4px 32px rgba(0,0,0,0.25)' }}
        >
          Welcome to <span className="text-green-200">Machhapuchhrey Dairy & Grocery</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-white/90 text-base sm:text-xl md:text-2xl text-center font-medium mb-1 md:mb-2"
        >
          Local freshness, trusted quality.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-white/80 text-sm sm:text-lg md:text-xl text-center mb-6 md:mb-8"
        >
          Your go-to store for dairy and groceries straight from ethical farms.
        </motion.p>
        <motion.button
          onClick={() => navigate('/our-products')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full shadow-lg text-lg sm:text-xl font-bold transition duration-300"
        >
          Browse All Products →
        </motion.button>
      </div>

      {/* Featured Products - Responsive Layout */}
      <AnimatePresence>
        {featured.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center w-full px-2 sm:px-4 max-w-5xl"
          >
            {featured.map((product, i) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.07, rotate: -2 + i * 2 }}
                className="bg-white/30 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-4 sm:p-6 w-full max-w-xs flex flex-col items-center transition-all duration-300 hover:shadow-2xl"
                style={{
                  marginTop: i % 2 === 0 ? 0 : 16,
                  marginBottom: i % 2 === 1 ? 0 : 16,
                  zIndex: 10 - i,
                }}
              >
                <img
                  src={product.imagePath ? `https://e-commerce-site-backend-hx6v.onrender.com/${product.imagePath.replace(/\\/g, '/')}` : '/resources/Logostore.png'}
                  alt={product.name}
                  className="h-20 w-20 sm:h-28 sm:w-28 object-cover rounded-full mb-3 sm:mb-4 border-4 border-green-100 shadow"
                  onError={e => { e.target.onerror = null; e.target.src = '/resources/Logostore.png'; }}
                />
                <div className="text-lg sm:text-xl font-bold text-green-900 mb-1 text-center">{product.name}</div>
                <div className="text-gray-700 mb-1 text-center text-sm sm:text-base">{product.description?.slice(0, 40)}{product.description?.length > 40 ? '...' : ''}</div>
                <div className="text-blue-700 font-semibold mb-2 text-center text-base sm:text-lg">
                  Rs. {product.price} <span className="text-xs text-gray-500">/{product.unit}</span>
                </div>
                <button
                  onClick={() => navigate('/our-products')}
                  className="mt-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white py-1 px-3 sm:px-4 rounded-lg text-xs sm:text-sm shadow transition"
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

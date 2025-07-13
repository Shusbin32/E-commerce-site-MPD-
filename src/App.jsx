import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Footer from './components/Footer';
import FirstPage from './Pages/FirstPage';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Home from './Pages/Home';
import CartPage from './Pages/CartPage';
import OurProducts from './Pages/OurProducts';
import AdminDashboard from './Pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import EsewaSuccess from './Pages/EsewaSuccess';
import EsewaFailure from './Pages/EsewaFailure';

// Create React Query Client
const queryClient = new QueryClient();

export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [role, setRole] = useState(localStorage.getItem('role') || 'guest');

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1";
    document.head.appendChild(meta);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setLoggedIn(false);
    setRole('guest');
    navigate('/login');
  };

  const addToCart = (product) => {
    const id = product._id || product.id;
    const exists = cartItems.find((item) => item.id === id);
    if (exists) {
      setCartItems(cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, id, quantity: 1 }]);
      
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      {/* ✅ Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/resources/Logostore.png"
            alt="Machhapuchhrey Dairy and Grocery Store"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold text-gray-800">
            Machhapuchhrey Store
          </span>
        </Link>

        <div className="space-x-4">
          {role !== 'admin' && (
            <>
              <Link to="/" className="text-gray-700 hover:text-blue-500 font-medium">Home</Link>
              <Link to="/our-products" className="text-gray-700 hover:text-blue-500 font-medium">Our Products</Link>
              {loggedIn && (
                <Link to="/cart" className="text-gray-700 hover:text-blue-500 font-medium">
                  Cart{" "}
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                    {cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)}
                  </span>
                </Link>
              )}
            </>
          )}

          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Login</button>
              </Link>
              <Link to="/signup">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route
          path="/our-products"
          element={<OurProducts addToCart={addToCart} loggedIn={loggedIn} />}
        />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setRole={setRole} />} />
        <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn} setRole={setRole} />} />

        <Route
          path="/cart"
          element={
            loggedIn && role === 'user' ? (
              <CartPage cartItems={cartItems} setCartItems={setCartItems} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute isLoggedIn={loggedIn} isAdmin={role === 'admin'}>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="/esewa-success" element={<EsewaSuccess />} />
        <Route path="/esewa-failure" element={<EsewaFailure />} />
      </Routes>

      <Footer />
      <ToastContainer position="bottom-right" />
    </QueryClientProvider>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';

function Login({ setLoggedIn, setRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password, isAdmin });
      localStorage.setItem('token', res.data.token);

      setError('');
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('role', res.data.user.role);
      setLoggedIn(true);
      setRole(res.data.user.role);

      // Show success toast
      toast.success(`Welcome, ${res.data.user.role === 'admin' ? 'Admin' : 'User'}! Login successful.`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });

      // Redirect based on role
      if (res.data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
      {/* Toggle between user/admin login */}
      <div className="flex justify-center mb-4 space-x-4">
        <button
          type="button"
          onClick={() => setIsAdmin(false)}
          className={`px-4 py-2 rounded ${!isAdmin ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          User Login
        </button>
        <button
          type="button"
          onClick={() => setIsAdmin(true)}
          className={`px-4 py-2 rounded ${isAdmin ? 'bg-red-600 text-white' : 'bg-gray-300'}`}
        >
          Admin Login
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">
        {isAdmin ? 'Admin' : 'User'} Login
      </h2>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-600 font-semibold">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
        
      </form>
    </div>
  );
}

export default Login;

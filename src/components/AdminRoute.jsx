import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children, isLoggedIn, isAdmin }) {
  return isLoggedIn && isAdmin ? children : <Navigate to="/login" />;
}

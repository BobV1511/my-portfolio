
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ adminOnly = false }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/signin" />;


  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" />;
  }


  return <Outlet />;
}

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, children }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

  if (!user && !loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && user && user.role !== 'admin' && !loading && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

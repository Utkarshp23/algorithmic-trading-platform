import React from 'react';
import { Navigate,useLocation } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  return token ? <Component {...rest} location={location}/> : <Navigate to="/" />;
};

export default ProtectedRoute;
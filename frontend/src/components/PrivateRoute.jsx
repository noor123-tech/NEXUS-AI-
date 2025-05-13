import { Navigate } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({ user, children }) => {
  if (!user) {
    // Redirect to login if not logged in
    return <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;

import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute = ({ allowedRoles }) => {
  const userJson = localStorage.getItem('nutrivida_user');
  const user = userJson ? JSON.parse(userJson) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute = ({ allowedRoles }) => {
  // Leemos la sesion desde localStorage
  const userJson = localStorage.getItem('nutrivida_user');
  const user = userJson ? JSON.parse(userJson) : null;

  if (!user) {
    // Si no ha iniciado sesion, redirige a /login sin pantalla en blanco
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Si no tiene el rol necesario (ej. Paciente intentando entrar a Admin), vuelve a inicio
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
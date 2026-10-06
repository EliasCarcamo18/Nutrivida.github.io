import { Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { Servicios } from './pages/Servicios';
import { ServiciosDetail } from './pages/ServiciosDetail';
import { Nosostros } from './pages/Nosotros';
import { Contacto } from './pages/Contacto';
import { Blog } from './pages/Blog';
import { Login } from './pages/Login';
import { Registro } from './pages/Registro';
import { Reserva } from './pages/Reserva';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Rutas Públicas */}
        <Route index element={<Home />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="servicios/:id" element={<ServiciosDetail />} />
        <Route path="nosotros" element={<Nosostros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="blog" element={<Blog />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />

        {/* Rutas Protegidas para Pacientes */}
        <Route element={<ProtectedRoute allowedRoles={['PACIENTE', 'ADMINISTRADOR']} />}>
          <Route path="reserva" element={<Reserva />} />
        </Route>

        {/* Ruta Exclusiva del Administrador */}
        <Route element={<ProtectedRoute allowedRoles={['ADMINISTRADOR']} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
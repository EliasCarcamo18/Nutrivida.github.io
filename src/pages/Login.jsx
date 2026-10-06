import { useState } from 'react';
import { useNavigate } from 'react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulación de autenticación y asignación de JWT/Rol
    if (email === 'admin@nutrivida.cl') {
      localStorage.setItem('token', 'fake-jwt-admin-token');
      localStorage.setItem('rol', 'ADMINISTRADOR');
      navigate('/admin');
    } else {
      localStorage.setItem('token', 'fake-jwt-paciente-token');
      localStorage.setItem('rol', 'PACIENTE');
      navigate('/reserva');
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center text-success mb-3">Iniciar Sesión</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Ingresar</button>
        </form>
      </div>
    </div>
  );
};
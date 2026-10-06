import { useState } from 'react';
import { useNavigate, Link } from 'react-router';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (role, userEmail) => {
    const sessionData = {
      email: userEmail || email || 'usuario@nutrivida.cl',
      role: role,
      nombre: role === 'ADMINISTRADOR' ? 'Administrador NutriVida' : 'Paciente NutriVida'
    };
    localStorage.setItem('nutrivida_user', JSON.stringify(sessionData));
    
    if (role === 'ADMINISTRADOR') {
      navigate('/admin');
    } else {
      navigate('/reserva');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simula ingreso de paciente por defecto
    handleLogin('PACIENTE', email);
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '420px', width: '100%' }}>
        <h3 className="text-center text-success mb-3">Ingresar a NutriVida</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="Ejemplo: paciente@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 mb-3">
            Iniciar Sesión
          </button>
        </form>

        <hr />

        <div className="text-center mb-3">
          <p className="text-muted small mb-2">Acceso rápido para pruebas / evaluación:</p>
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => handleLogin('PACIENTE', 'paciente@nutrivida.cl')}
            >
              Ingresar como Paciente (Reserva)
            </button>
            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              onClick={() => handleLogin('ADMINISTRADOR', 'admin@nutrivida.cl')}
            >
              Ingresar como Administrador (Panel Admin)
            </button>
          </div>
        </div>

        <div className="text-center mt-2">
          <span className="small text-muted">¿No tienes cuenta? </span>
          <Link to="/registro" className="small text-success fw-bold">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
};
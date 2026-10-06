import { Link, useNavigate } from 'react-router';

export const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🥗 NutriVida
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/servicios">Servicios</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
            {token && (
              <li className="nav-item"><Link className="nav-link text-warning fw-bold" to="/reserva">Reservar Cita</Link></li>
            )}
            {rol === 'ADMINISTRADOR' && (
              <li className="nav-item"><Link className="nav-link text-white fw-bold bg-dark px-2 rounded" to="/admin">Admin Panel</Link></li>
            )}
          </ul>
          <div className="d-flex gap-2">
            {!token ? (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm">Iniciar Sesión</Link>
                <Link to="/registro" className="btn btn-light btn-sm">Registrarse</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn btn-danger btn-sm">Cerrar Sesión</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
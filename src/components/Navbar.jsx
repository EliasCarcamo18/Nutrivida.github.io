import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const userJson = localStorage.getItem('nutrivida_user');
  const user = userJson ? JSON.parse(userJson) : null;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('nutrivida_user');
    closeMenu();
    navigate('/login');
  };

  return (
    <header className="navbar-site">
      <div className="navbar-container">
        <Link className="navbar-brand" onClick={closeMenu} to="/">
          NutriVida
        </Link>

        <button
          type="button"
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Abrir menú de navegación"
        >
          <span className="navbar-toggle-icon">☰</span>
        </button>

        <nav className={`navbar-menu ${isOpen ? 'is-open' : ''}`}>
          <ul className="navbar-nav">
            <li><Link className="nav-link" onClick={closeMenu} to="/">Inicio</Link></li>
            <li><Link className="nav-link" onClick={closeMenu} to="/servicios">Servicios</Link></li>
            <li><Link className="nav-link" onClick={closeMenu} to="/nosotros">Nosotros</Link></li>
            <li><Link className="nav-link" onClick={closeMenu} to="/contacto">Contacto</Link></li>
            <li><Link className="nav-link" onClick={closeMenu} to="/blog">Blog</Link></li>

            {user && (
              <li><Link className="nav-link" onClick={closeMenu} to="/reserva">Reservar</Link></li>
            )}

            {user?.role === 'ADMINISTRADOR' && (
              <li><Link className="nav-link fw-bold text-warning" onClick={closeMenu} to="/admin">Admin</Link></li>
            )}

            {!user ? (
              <li>
                <Link className="nav-link nav-link-btn" onClick={closeMenu} to="/login">
                  Ingresar
                </Link>
              </li>
            ) : (
              <li>
                <button type="button" className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
                  Salir ({user.role})
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
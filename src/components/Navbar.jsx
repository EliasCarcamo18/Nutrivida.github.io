import { useState } from 'react';
import { Link } from 'react-router';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Funciones para abrir/cerrar menú en dispositivos móviles
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar-site">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          NutriVida
        </Link>

        {/* Botón de hamburguesa visible solo en móviles/tablets */}
        <button 
          type="button"
          className="navbar-toggle" 
          onClick={toggleMenu} 
          aria-label="Abrir menú de navegación"
        >
          <span className="navbar-toggle-icon">☰</span>
        </button>

        {/* Contenedor del menú: en móvil se muestra según 'isOpen' */}
        <nav className={`navbar-menu ${isOpen ? 'is-open' : ''}`}>
          <ul className="navbar-nav">
            <li>
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/servicios" className="nav-link" onClick={closeMenu}>
                Servicios
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="nav-link" onClick={closeMenu}>
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="nav-link" onClick={closeMenu}>
                Contacto
              </Link>
            </li>
            <li>
              <Link to="/blog" className="nav-link" onClick={closeMenu}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link nav-link-btn" onClick={closeMenu}>
                Ingresar
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
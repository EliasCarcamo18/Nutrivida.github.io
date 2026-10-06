export const Footer = () => {
  return (
    <footer className="footer-site">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Columna 1: Información de la Clínica */}
          <div className="footer-section">
            <h3 className="footer-brand">Clínica NutriVida</h3>
            <p className="footer-text">
              Acompañamiento nutricional humano y personalizado basado en evidencia científica en Temuco.
            </p>
          </div>

          {/* Columna 2: Horarios de Atención (Reemplaza al menú repetido) */}
          <div className="footer-section">
            <h4 className="footer-title">Horarios de Atención</h4>
            <p className="footer-text">Lunes a Viernes: 08:30 - 19:30 hrs</p>
            <p className="footer-text">Sábados: 09:00 - 14:00 hrs</p>
            <p className="footer-text">Domingos y Festivos: Cerrado</p>
          </div>

          {/* Columna 3: Información de Contacto */}
          <div className="footer-section">
            <h4 className="footer-title">Contacto</h4>
            <p className="footer-contact-item">
              <span className="footer-icon">📍</span> Av. Alemania 0820, Temuco
            </p>
            <p className="footer-contact-item">
              <span className="footer-icon">📞</span> +56 45 2 123456
            </p>
            <p className="footer-contact-item">
              <span className="footer-icon">✉️</span> contacto@nutrivida.cl
            </p>
          </div>

        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} NutriVida. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
export const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-3 mt-auto">
      <div className="container text-center text-md-start">
        <div className="row">
          <div className="col-md-6 mb-3">
            <h5 className="text-success fw-bold">Clínica Nutricional NutriVida</h5>
            <p className="small text-muted">
              Asesoría nutricional personalizada en Temuco, Región de La Araucanía.
            </p>
          </div>
          <div className="col-md-6 mb-3 text-md-end">
            <h6>Contacto</h6>
            <p className="small text-muted mb-1">📍 Temuco, Chile</p>
            <p className="small text-muted mb-0">📞 +56 45 200 0000</p>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="text-center small text-muted">
          &copy; {new Date().getFullYear()} NutriVida. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
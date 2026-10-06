import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-1 text-danger fw-bold">404</h1>
      <h2>Página no encontrada</h2>
      <p className="text-muted">La ruta a la que intentas acceder no existe.</p>
      <Link to="/" className="btn btn-primary mt-3">Volver al Inicio</Link>
    </div>
  );
};
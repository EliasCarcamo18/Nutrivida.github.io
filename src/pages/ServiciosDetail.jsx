import { useParams, Link } from 'react-router';

export const ServiciosDetail = () => {
  const { id } = useParams();

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4">
        <span className="badge bg-success mb-2 w-auto">Código: {id}</span>
        <h2>Detalle del Servicio {id}</h2>
        <p className="text-muted mt-2">
          Información detallada sobre la atención nutricional, duraciones, metodologías y recomendaciones para el paciente.
        </p>
        <hr />
        <p><strong>Ubicación:</strong> Clínica NutriVida, Temuco.</p>
        <p><strong>Duración estimada:</strong> 30 a 50 minutos.</p>
        <div className="d-flex gap-3 mt-4">
          <Link to="/reserva" className="btn btn-success">Agendar para este Servicio</Link>
          <Link to="/servicios" className="btn btn-outline-secondary">Volver al Catálogo</Link>
        </div>
      </div>
    </div>
  );
};
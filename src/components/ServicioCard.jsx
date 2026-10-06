import { Link } from 'react-router';
import PropTypes from 'prop-types';

export const ServicioCard = ({ servicio }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <span className="badge bg-info text-dark mb-2 w-auto align-self-start">
          {servicio.tipo}
        </span>
        <h5 className="card-title">{servicio.nombre}</h5>
        <p className="card-text text-muted flex-grow-1">{servicio.descripcion}</p>
        <div className="mt-3">
          <p className="fw-bold mb-1">Precio: ${servicio.precio.toLocaleString('es-CL')}</p>
          <p className="small text-secondary mb-3">Modalidad: {servicio.modalidad}</p>
          <Link to={`/servicios/${servicio.codigo}`} className="btn btn-outline-primary btn-sm w-100">
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
};

ServicioCard.propTypes = {
  servicio: PropTypes.shape({
    codigo: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    modalidad: PropTypes.string.isRequired,
  }).isRequired,
};
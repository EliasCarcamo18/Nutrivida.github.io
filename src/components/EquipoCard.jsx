import PropTypes from 'prop-types';

export const EquipoCard = ({ nutricionista }) => {
  return (
    <div className="card h-100 shadow-sm border-0 bg-light">
      <div className="card-body text-center">
        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '70px', height: '70px', fontSize: '1.5rem' }}>
          {nutricionista.nombre.charAt(5)}
        </div>
        <h5 className="card-title">{nutricionista.nombre}</h5>
        <p className="text-primary fw-medium small mb-2">{nutricionista.especialidad}</p>
        <hr />
        <p className="card-text small mb-1"><strong>Días:</strong> {nutricionista.dias}</p>
        <p className="card-text small text-muted"><strong>Horario:</strong> {nutricionista.horario}</p>
      </div>
    </div>
  );
};

EquipoCard.propTypes = {
  nutricionista: PropTypes.shape({
    codigo: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    especialidad: PropTypes.string.isRequired,
    dias: PropTypes.string.isRequired,
    horario: PropTypes.string.isRequired,
  }).isRequired,
};
import PropTypes from 'prop-types';

export const Status = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="d-flex justify-content-center my-4" data-testid="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger my-4" role="alert" data-testid="error-message">
        <strong>Ocurrió un error:</strong> {error}
      </div>
    );
  }

  return null;
};

Status.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
};
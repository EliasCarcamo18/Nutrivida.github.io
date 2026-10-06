import PropTypes from 'prop-types';

export const UsuarioTabla = ({ usuarios, onCambiarRol, onCambiarEstado }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>
                <select
                  className="form-select form-select-sm"
                  value={u.rol}
                  onChange={(e) => onCambiarRol(u.id, e.target.value)}
                >
                  <option value="PACIANTE">PACIENTE</option>
                  <option value="NUTRICIONISTA">NUTRICIONISTA</option>
                  <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                </select>
              </td>
              <td>
                <span className={`badge ${u.activo ? 'bg-success' : 'bg-danger'}`}>
                  {u.activo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>
                <button
                  className={`btn btn-sm ${u.activo ? 'btn-outline-danger' : 'btn-outline-success'}`}
                  onClick={() => onCambiarEstado(u.id, !u.activo)}
                >
                  {u.activo ? 'Desactivar' : 'Activar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UsuarioTabla.propTypes = {
  usuarios: PropTypes.array.isRequired,
  onCambiarRol: PropTypes.func.isRequired,
  onCambiarEstado: PropTypes.func.isRequired,
};
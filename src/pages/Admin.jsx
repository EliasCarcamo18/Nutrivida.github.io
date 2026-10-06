import { useState, useEffect } from 'react';
import { obtenerUsuarios, actualizarRolUsuario, cambiarEstadoUsuario } from '../services/usuarios';
import { UsuarioTabla } from '../components/UsuarioTabla';
import { Status } from '../components/Status';

export const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const data = await obtenerUsuarios(token);
      setUsuarios(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleCambiarRol = async (id, nuevoRol) => {
    try {
      await actualizarRolUsuario(id, nuevoRol, token);
      cargarUsuarios();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      await cambiarEstadoUsuario(id, nuevoEstado, token);
      cargarUsuarios();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container my-4">
      <h2>Panel de Administración - Clínica NutriVida</h2>
      <p className="text-muted">Gestión de usuarios y asignación de roles del sistema.</p>

      <Status loading={loading} error={error} />

      {!loading && !error && (
        <UsuarioTabla
          usuarios={usuarios}
          onCambiarRol={handleCambiarRol}
          onCambiarEstado={handleCambiarEstado}
        />
      )}
    </div>
  );
};
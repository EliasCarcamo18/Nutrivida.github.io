import { useState, useEffect } from 'react';
import { obtenerUsuarios, actualizarRolUsuario, cambiarEstadoUsuario } from '../services/usuarios';
import { UsuarioTabla } from '../components/UsuarioTabla';

export const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('nutrivida_user') || 'null');

  const cargarUsuarios = async () => {
    try {
      const data = await obtenerUsuarios(user?.token);
      setUsuarios(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleCambiarRol = async (id, nuevoRol) => {
    try {
      const actualizado = await actualizarRolUsuario(id, nuevoRol, user?.token);
      setUsuarios((prev) => prev.map((u) => (u.id === id ? actualizado : u)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCambiarEstado = async (id, activo) => {
    try {
      const actualizado = await cambiarEstadoUsuario(id, activo, user?.token);
      setUsuarios((prev) => prev.map((u) => (u.id === id ? actualizado : u)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-success mb-2">Panel de Administración - Clínica NutriVida</h2>
      <p className="text-muted mb-4">Gestión de usuarios, roles y permisos protegidos mediante JWT.</p>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="border rounded p-3 bg-light">
        <UsuarioTabla
          usuarios={usuarios}
          onCambiarRol={handleCambiarRol}
          onCambiarEstado={handleCambiarEstado}
        />
      </div>
    </div>
  );
};
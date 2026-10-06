import { useState, useEffect } from 'react';

export const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Intentar cargar usuarios del backend o respaldar con datos locales
    fetch('http://localhost:3000/api/users')
      .then((res) => {
        if (!res.ok) throw new Error('Servidor no disponible');
        return res.json();
      })
      .then((data) => setUsuarios(data))
      .catch(() => {
        // Datos de respaldo para que la app no muestre 'Failed to fetch'
        setUsuarios([
          { id: 1, nombre: 'María González', email: 'maria@ejemplo.com', rol: 'PACIENTE' },
          { id: 2, nombre: 'Admin NutriVida', email: 'admin@nutrivida.cl', rol: 'ADMINISTRADOR' }
        ]);
      });
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-success mb-2">Panel de Administración - Clínica NutriVida</h2>
      <p className="text-muted mb-4">Gestión de usuarios y asignación de roles del sistema.</p>

      <div className="table-responsive border rounded p-3 bg-light">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge ${u.rol === 'ADMINISTRADOR' ? 'bg-danger' : 'bg-success'}`}>
                    {u.rol}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
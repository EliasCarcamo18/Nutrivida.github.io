const API_URL = 'http://localhost:8081/api/v1/usuarios';

export const obtenerUsuarios = async (token) => {
  const response = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Error al obtener la lista de usuarios');
  }
  return response.json();
};

export const actualizarRolUsuario = async (id, nuevoRol, token) => {
  const response = await fetch(`${API_URL}/${id}/rol`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ rol: nuevoRol })
  });
  if (!response.ok) {
    throw new Error('Error al actualizar el rol del usuario');
  }
  return response.json();
};

export const cambiarEstadoUsuario = async (id, activo, token) => {
  const response = await fetch(`${API_URL}/${id}/estado`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ activo })
  });
  if (!response.ok) {
    throw new Error('Error al cambiar el estado del usuario');
  }
  return response.json();
};
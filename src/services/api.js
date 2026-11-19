const API_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export function getAuthHeaders() {
  const userJson = localStorage.getItem('nutrivida_user');
  const user = userJson ? JSON.parse(userJson) : null;
  return user?.token
    ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
    : { 'Content-Type': 'application/json' };
}

export async function loginUsuario(email, password) {
  const response = await fetch(`/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.mensaje || 'Credenciales incorrectas.');
  }
  return data;
}

export async function registrarUsuario(nombre, email, password) {
  const response = await fetch(`/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.mensaje || 'No se pudo completar el registro.');
  }
  return data;
}

export async function obtenerHorasOcupadas(servicio, fecha) {
  const params = new URLSearchParams({ servicio, fecha });
  const response = await fetch(`/citas/ocupadas?${params.toString()}`);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.mensaje || 'No hay conexión con el servidor o la base de datos.');
  }
  return response.json();
}

export async function crearCita(citaData) {
  const response = await fetch(`/citas`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(citaData),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.mensaje || 'Error al registrar la cita en el servidor.');
  }
  return response.json();
}

export async function enviarMensajeContacto(contactoData) {
  const response = await fetch(`/contacto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactoData),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.mensaje || 'Error al enviar el mensaje de contacto.');
  }
  return response.json();
}
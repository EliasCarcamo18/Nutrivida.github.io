const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// 1. Obtener todas las citas (GET /api/citas)
export async function obtenerCitas() {
  const response = await fetch(`${API_URL}/citas`);
  if (!response.ok) {
    throw new Error('Error al obtener las citas');
  }
  return response.json();
}

// 2. Registrar una nueva cita (POST /api/citas)
export async function crearCita(citaData) {
  const response = await fetch(`${API_URL}/citas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(citaData),
  });
  if (!response.ok) {
    throw new Error('Error al registrar la cita');
  }
  return response.json();
}

// 3. Enviar formulario de contacto (POST /api/contacto)
export async function enviarMensajeContacto(contactoData) {
  const response = await fetch(`${API_URL}/contacto`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactoData),
  });
  if (!response.ok) {
    throw new Error('Error al enviar el mensaje de contacto');
  }
  return response.json();
}
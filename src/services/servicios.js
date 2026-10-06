const API_URL = 'http://localhost:8082/api/v1/servicios';

export const obtenerServicios = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al cargar el catálogo de servicios');
  }
  return response.json();
};

export const obtenerServicioPorId = async (codigo) => {
  const response = await fetch(`${API_URL}/${codigo}`);
  if (!response.ok) {
    throw new Error(`Error al obtener el servicio ${codigo}`);
  }
  return response.json();
};
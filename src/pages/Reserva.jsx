import { useState, useEffect, useCallback } from 'react';
import { crearCita, obtenerHorasOcupadas } from '../services/api';

export const Reserva = () => {
  const especialistas = [
    {
      id: 'carolina',
      nombre: 'Nut. Carolina Fuentes M. (Obesidad y síndrome metabólico)',
      horarios: ['09:00 hrs', '10:30 hrs', '15:00 hrs', '16:30 hrs']
    },
    {
      id: 'felipe',
      nombre: 'Nut. Felipe Arriagada G. (Nutrición Deportiva)',
      horarios: ['08:30 hrs', '11:00 hrs', '14:00 hrs', '17:30 hrs']
    },
    {
      id: 'andrea',
      nombre: 'Nut. Andrea Morales T. (Nutrición Infantil y Escolar)',
      horarios: ['10:00 hrs', '12:00 hrs', '16:00 hrs', '18:00 hrs']
    }
  ];

  const [nombrePaciente, setNombrePaciente] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [especialistaSeleccionado, setEspecialistaSeleccionado] = useState(especialistas[0].id);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);
  const [errorServidor, setErrorServidor] = useState('');
  const [errorConexion, setErrorConexion] = useState('');
  const [enviando, setEnviando] = useState(false);

  const nutricionistaActual = especialistas.find(e => e.id === especialistaSeleccionado);

  const cargarDisponibilidad = useCallback(async () => {
    if (!fecha) {
      setHorasOcupadas([]);
      setErrorConexion('');
      return;
    }
    try {
      setErrorConexion('');
      const ocupadas = await obtenerHorasOcupadas(nutricionistaActual.nombre, fecha);
      const lista = Array.isArray(ocupadas) ? ocupadas : [];
      setHorasOcupadas(lista);
      setHora((horaActual) => (lista.includes(horaActual) ? '' : horaActual));
    } catch (err) {
      setErrorConexion(err.message || 'No hay conexión con la base de datos. Verifica el servidor.');
    }
  }, [nutricionistaActual.nombre, fecha]);

  useEffect(() => {
    cargarDisponibilidad();
  }, [cargarDisponibilidad]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!nombrePaciente.trim()) {
      nuevosErrores.nombrePaciente = 'Por favor, ingresa tu nombre completo.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nuevosErrores.email = 'Por favor, ingresa un correo electrónico válido.';
    }
    if (!telefono.trim()) {
      nuevosErrores.telefono = 'Por favor, ingresa tu teléfono de contacto.';
    }
    if (!fecha) {
      nuevosErrores.fecha = 'Por favor, selecciona la fecha de la cita.';
    }
    if (!hora || horasOcupadas.includes(hora)) {
      nuevosErrores.hora = 'Por favor, elige una hora disponible de la lista.';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setExito(false);
      return;
    }

    setErrores({});
    setErrorServidor('');
    setEnviando(true);

    try {
      await crearCita({
        nombrePaciente: nombrePaciente.trim(),
        email: email.trim(),
        telefono: telefono.trim(),
        fechaCita: `${fecha} ${hora}`,
        servicio: nutricionistaActual.nombre,
      });
      setExito(true);
      setHorasOcupadas((prev) => [...prev, hora]);
      setNombrePaciente('');
      setEmail('');
      setTelefono('');
      setHora('');
    } catch (err) {
      setExito(false);
      setErrorServidor(err.message || 'No se pudo conectar con el servidor para agendar la cita.');
      cargarDisponibilidad();
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-success mb-3">Agendar Cita Nutricional</h2>

      {exito && (
        <div className="alert alert-success" role="alert">
          Solicitud de cita enviada exitosamente. Se ha agendado con {nutricionistaActual.nombre}.
        </div>
      )}

      {errorConexion && (
        <div className="alert alert-warning d-flex justify-content-between align-items-center" role="alert">
          <span>{errorConexion}</span>
          <button type="button" className="btn btn-sm btn-outline-dark" onClick={cargarDisponibilidad}>
            Reintentar
          </button>
        </div>
      )}

      {errorServidor && (
        <div className="alert alert-danger" role="alert">
          {errorServidor}
        </div>
      )}

      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label font-weight-bold">Nombre Completo</label>
            <input
              type="text"
              placeholder="Ej: Camila Rojas"
              className={`form-control ${errores.nombrePaciente ? 'is-invalid' : ''}`}
              value={nombrePaciente}
              onChange={(e) => setNombrePaciente(e.target.value)}
            />
            {errores.nombrePaciente && <div className="invalid-feedback d-block">{errores.nombrePaciente}</div>}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label font-weight-bold">Correo Electrónico</label>
              <input
                type="email"
                placeholder="correo@ejemplo.cl"
                className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errores.email && <div className="invalid-feedback d-block">{errores.email}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label font-weight-bold">Teléfono</label>
              <input
                type="tel"
                placeholder="+56 9 1234 5678"
                className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              {errores.telefono && <div className="invalid-feedback d-block">{errores.telefono}</div>}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label font-weight-bold">Seleccionar Nutricionista y Servicio</label>
            <select
              className="form-select"
              value={especialistaSeleccionado}
              onChange={(e) => {
                setEspecialistaSeleccionado(e.target.value);
                setHora('');
              }}
            >
              {especialistas.map((esp) => (
                <option key={esp.id} value={esp.id}>
                  {esp.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label font-weight-bold">Fecha de Atención</label>
            <input
              type="date"
              className={`form-control ${errores.fecha ? 'is-invalid' : ''}`}
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
            {errores.fecha && <div className="invalid-feedback d-block">{errores.fecha}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label font-weight-bold">Horarios Disponibles para este Especialista</label>
            <select
              className={`form-select ${errores.hora ? 'is-invalid' : ''}`}
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            >
              <option value="">-- Selecciona una hora disponible --</option>
              {nutricionistaActual.horarios.map((h, i) => {
                const ocupada = horasOcupadas.includes(h);
                return (
                  <option key={i} value={h} disabled={ocupada}>
                    {ocupada ? `${h} (No disponible)` : h}
                  </option>
                );
              })}
            </select>
            {errores.hora && <div className="invalid-feedback d-block">{errores.hora}</div>}
          </div>

          <button type="submit" className="btn btn-success w-100" disabled={enviando}>
            {enviando ? 'Agendando...' : 'Confirmar y Agendar Cita'}
          </button>
        </form>
      </div>
    </div>
  );
};
import { useState } from 'react';

export const Reserva = () => {
  // Lista de especialistas con sus horarios y días disponibles
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

  const [especialistaSeleccionado, setEspecialistaSeleccionado] = useState(especialistas[0].id);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);

  // Obtiene los horarios disponibles según el especialista activo
  const nutricionistaActual = especialistas.find(e => e.id === especialistaSeleccionado);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!fecha) {
      nuevosErrores.fecha = 'Por favor, selecciona la fecha de la cita.';
    }

    if (!hora) {
      nuevosErrores.hora = 'Por favor, elige una hora disponible de la lista.';
    }

    if (!motivo.trim()) {
      nuevosErrores.motivo = 'Por favor, describe brevemente el motivo de tu consulta antes de agendar.';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setExito(false);
      return;
    }

    setErrores({});
    setExito(true);
    setMotivo('');
    setFecha('');
    setHora('');
  };

  return (
    <div className="container py-4">
      <h2 className="text-success mb-3">Agendar Cita Nutricional</h2>

      {exito && (
        <div className="alert alert-success" role="alert">
          Solicitud de cita enviada exitosamente. Se ha agendado con {nutricionistaActual.nombre}.
        </div>
      )}

      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit} noValidate>
          {/* Seleccionar Nutricionista */}
          <div className="mb-3">
            <label className="form-label font-weight-bold">Seleccionar Nutricionista</label>
            <select
              className="form-select"
              value={especialistaSeleccionado}
              onChange={(e) => {
                setEspecialistaSeleccionado(e.target.value);
                setHora(''); // Reiniciar hora al cambiar especialista
              }}
            >
              {especialistas.map((esp) => (
                <option key={esp.id} value={esp.id}>
                  {esp.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
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

          {/* Horarios disponibles según el especialista */}
          <div className="mb-3">
            <label className="form-label font-weight-bold">Horarios Disponibles para este Especialista</label>
            <select
              className={`form-select ${errores.hora ? 'is-invalid' : ''}`}
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            >
              <option value="">-- Selecciona una hora disponible --</option>
              {nutricionistaActual.horarios.map((h, i) => (
                <option key={i} value={h}>
                  {h}
                </option>
              ))}
            </select>
            {errores.hora && <div className="invalid-feedback d-block">{errores.hora}</div>}
          </div>

          {/* Motivo de la Consulta */}
          <div className="mb-3">
            <label className="form-label font-weight-bold">Motivo de la Consulta <span className="text-danger">*</span></label>
            <textarea
              className={`form-control ${errores.motivo ? 'is-invalid' : ''}`}
              rows="3"
              placeholder="Ejemplo: Evaluación nutricional deportiva, plan de alimentación para control de peso..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            ></textarea>
            {errores.motivo && <div className="invalid-feedback d-block">{errores.motivo}</div>}
          </div>

          <button type="submit" className="btn btn-success w-100">
            Confirmar y Agendar Cita
          </button>
        </form>
      </div>
    </div>
  );
};
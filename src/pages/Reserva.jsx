import { useState } from 'react';

export const Reserva = () => {
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje('Solicitud de cita enviada exitosamente. Un correo de confirmación ha sido enviado.');
  };

  return (
    <div className="container py-5">
      <h2 className="text-success mb-4">Agendar Cita Nutricional</h2>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Seleccionar Nutricionista</label>
          <select name="nutricionistaId" className="form-select" required>
            <option value="">-- Seleccione --</option>
            <option value="NUT001">Nut. Carolina Fuentes M. (Obesidad y síndrome metabólico)</option>
            <option value="NUT002">Nut. Rodrigo Sepúlveda A. (Nutrición deportiva)</option>
            <option value="NUT003">Nut. Daniela Morales C. (Vegetariana/Vegana)</option>
            <option value="NUT004">Nut. Felipe Araya R. (Pediátrica)</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha y Hora</label>
          <input type="datetime-local" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Motivo de la Consulta</label>
          <textarea name="motivo" className="form-control" rows="3" required></textarea>
        </div>
        <button type="submit" className="btn btn-success">Confirmar Solicitud de Cita</button>
      </form>
    </div>
  );
};
export const Contacto = () => {
  return (
    <div className="container py-5">
      <h2 className="text-success mb-4">Contacto y Ubicación</h2>
      <div className="row g-4">
        <div className="col-md-6">
          <h5>Envíanos un mensaje</h5>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Mensaje</label>
              <textarea className="form-control" rows="4" required></textarea>
            </div>
            <button type="submit" className="btn btn-success">Enviar Consulta</button>
          </form>
        </div>
        <div className="col-md-6">
          <h5>Ubicación en Temuco</h5>
          <p className="text-muted">Nos encontramos en el sector central de Temuco, Región de La Araucanía.</p>
          <div className="bg-light p-4 rounded text-center border">
            <p className="mb-1">📍 <strong>Dirección:</strong> Av. Alemania #0810, Temuco</p>
            <p className="mb-0">🕒 <strong>Horario:</strong> Lunes a Viernes 08:00 - 19:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};
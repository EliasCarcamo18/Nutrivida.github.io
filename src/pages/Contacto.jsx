import { useState } from 'react';

export const Contacto = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
  const [errorEmail, setErrorEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validacion de correo en espanol
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorEmail('Por favor, ingresa un correo valido. Ejemplo: paciente@ejemplo.com');
      return;
    }

    setErrorEmail('');
    setEnviado(true);
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <div className="container py-4 py-md-5">
      <h2 className="text-success mb-4">Contacto y Ubicación</h2>

      <div className="row g-4">
        {/* Formulario de Contacto */}
        <div className="col-12 col-md-6">
          <div className="p-4 border rounded bg-light">
            <h4>Envíanos un mensaje</h4>
            {enviado && (
              <div className="alert alert-success" role="alert">
                ¡Gracias por contactarnos! Te responderemos a la brevedad.
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: María González"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className={`form-control ${errorEmail ? 'is-invalid' : ''}`}
                  placeholder="Ejemplo: paciente@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errorEmail) setErrorEmail('');
                  }}
                  required
                />
                {errorEmail && <div className="invalid-feedback">{errorEmail}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Mensaje</label>
                <textarea
                  className="form-rows-3 form-control"
                  rows="4"
                  placeholder="Escribe tu consulta o requerimiento aquí..."
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success w-100">
                Enviar Consulta
              </button>
            </form>
          </div>
        </div>

        {/* Mapa y datos de la clínica en Temuco */}
        <div className="col-12 col-md-6">
          <div className="p-4 border rounded bg-light h-100 d-flex flex-column">
            <h4>Nuestra Ubicación en Temuco</h4>
            <p className="text-muted">Av. Alemania 0820, Temuco, Región de La Araucanía.</p>
            <div className="flex-grow-1 min-vh-250 mt-2">
              <iframe
                title="Ubicacion NutriVida Temuco"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.51888258602!2d-72.6048123234125!3d-38.7403209876251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9614d3f28d82121d%3A0x87959f63567b4b1a!2sAv.%20Alemania%200820%2C%20Temuco%2C%20Araucan%C3%ADa!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl"
                width="100%"
                height="280"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
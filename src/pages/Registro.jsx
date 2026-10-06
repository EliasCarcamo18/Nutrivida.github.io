import { useState } from 'react';
import { useNavigate, Link } from 'react-router';

export const Registro = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'Por favor, ingresa tu nombre completo (ej: Juan Pérez).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      nuevosErrores.email = 'Por favor, ingresa tu correo electrónico.';
    } else if (!emailRegex.test(formData.email)) {
      nuevosErrores.email = 'Escribe un correo válido con formato usuario@dominio.com';
    }

    if (!formData.password) {
      nuevosErrores.password = 'Ingresa una contraseña de al menos 6 caracteres.';
    } else if (formData.password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener un mínimo de 6 caracteres.';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});
    const sessionData = {
      email: formData.email,
      nombre: formData.nombre,
      role: 'PACIENTE'
    };
    localStorage.setItem('nutrivida_user', JSON.stringify(sessionData));
    navigate('/reserva');
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '420px', width: '100%' }}>
        <h3 className="text-center text-success mb-3">Registro de Paciente</h3>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Nombre Completo</label>
            <input
              type="text"
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
              placeholder="Ejemplo: María González"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
            {errores.nombre && <div className="invalid-feedback d-block">{errores.nombre}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className={`form-control ${errores.email ? 'is-invalid' : ''}`}
              placeholder="Ejemplo: paciente@ejemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errores.email && <div className="invalid-feedback d-block">{errores.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className={`form-control ${errores.password ? 'is-invalid' : ''}`}
              placeholder="Mínimo 6 caracteres"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errores.password && <div className="invalid-feedback d-block">{errores.password}</div>}
          </div>

          <button type="submit" className="btn btn-success w-100 mb-3">
            Crear Cuenta
          </button>
        </form>

        <div className="text-center mt-2">
          <span className="small text-muted">¿Ya tienes cuenta? </span>
          <Link to="/login" className="small text-success fw-bold">Inicia sesión aquí</Link>
        </div>
      </div>
    </div>
  );
};
import { Link } from 'react-router';
import { EquipoCard } from '../components/EquipoCard';

const nutricionistasMock = [
  { codigo: 'NUT001', nombre: 'Nut. Carolina Fuentes M.', especialidad: 'Obesidad y síndrome metabólico', dias: 'Lunes, Miércoles, Viernes', horario: '09:00 - 17:00' },
  { codigo: 'NUT002', nombre: 'Nut. Rodrigo Sepúlveda A.', especialidad: 'Nutrición deportiva y rendimiento', dias: 'Martes, Jueves, Sábado', horario: '09:00 - 14:00' },
  { codigo: 'NUT003', nombre: 'Nut. Daniela Morales C.', especialidad: 'Alimentación vegetariana y vegana', dias: 'Lunes a Viernes', horario: '08:00 - 13:00' },
  { codigo: 'NUT004', nombre: 'Nut. Felipe Araya R.', especialidad: 'Nutrición pediátrica y familiar', dias: 'Martes a Viernes', horario: '14:00 - 19:00' }
];

export const Home = () => {
  return (
    <div>
      <section className="bg-light py-5 border-bottom">
        <div className="container text-center py-4">
          <h1 className="display-5 fw-bold text-success">Clínica Nutricional NutriVida</h1>
          <p className="lead text-secondary mx-auto style={{ maxWidth: '700px' }}">
            Asesoría nutricional personalizada en Temuco. Transforma tu alimentación con el apoyo de nuestros especialistas.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/reserva" className="btn btn-success btn-lg">Agendar Cita</Link>
            <Link to="/servicios" className="btn btn-outline-secondary btn-lg">Ver Planes</Link>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="text-center mb-4">Nuestros Especialistas</h2>
        <div className="row g-4">
          {nutricionistasMock.map((nut) => (
            <div key={nut.codigo} className="col-12 col-md-6 col-lg-3">
              <EquipoCard nutricionista={nut} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
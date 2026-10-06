import { ServicioCard } from '../components/ServicioCard';

const serviciosMock = [
  { codigo: 'CN001', tipo: 'Consulta', nombre: 'Primera consulta nutricional', descripcion: 'Evaluación inicial, anamnesis y pauta personalizada.', precio: 35000, modalidad: 'Presencial' },
  { codigo: 'CN002', tipo: 'Consulta', nombre: 'Control nutricional quincenal/mensual', descripcion: 'Seguimiento de indicadores antropométricos.', precio: 25000, modalidad: 'Presencial' },
  { codigo: 'PL001', tipo: 'Plan', nombre: 'Plan pérdida de peso (1 mes)', descripcion: 'Incluye primera consulta + 1 control quincenal + WhatsApp.', precio: 65000, modalidad: 'Presencial' },
  { codigo: 'PL003', tipo: 'Plan', nombre: 'Plan nutrición deportiva (1 mes)', descripcion: 'Cálculo de requerimientos energéticos y suplementación.', precio: 70000, modalidad: 'Presencial' }
];

export const Servicios = () => {
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-success">Catálogo de Servicios y Planes</h2>
      <div className="row g-4">
        {serviciosMock.map((servicio) => (
          <div key={servicio.codigo} className="col-12 col-md-6 col-lg-4">
            <ServicioCard servicio={servicio} />
          </div>
        ))}
      </div>
    </div>
  );
};
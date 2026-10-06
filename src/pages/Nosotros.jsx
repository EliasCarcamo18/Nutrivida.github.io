export const Nosotros = () => {
  return (
    <div className="container py-4 py-md-5">
      <h2 className="text-success mb-3 text-center text-md-start">Sobre NutriVida</h2>
      <p className="lead text-secondary text-center text-md-start">
        Fundada en 2016 en Temuco, la Clínica NutriVida nació con el compromiso de ofrecer un acompañamiento nutricional humano, basado en evidencia científica.
      </p>
      
      <div className="row mt-4 g-4">
        <div className="col-12 col-md-6">
          <div className="p-3 border rounded bg-light h-100">
            <h4 className="text-success">Nuestra Misión</h4>
            <p className="mb-0">
              Mejorar la calidad de vida de nuestros pacientes mediante hábitos sostenibles en el tiempo.
            </p>
          </div>
        </div>
        
        <div className="col-12 col-md-6">
          <div className="p-3 border rounded bg-light h-100">
            <h4 className="text-success">Nuestra Visión</h4>
            <p className="mb-0">
              Ser el centro nutricional de referencia en la Región de La Araucanía en atención integral.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
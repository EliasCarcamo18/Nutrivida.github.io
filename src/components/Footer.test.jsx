import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Footer } from './Footer';

describe('Pruebas en <Footer />', () => {
  test('Debe mostrar el nombre de la clínica y la ubicación', () => {
    render(<Footer />);

    expect(screen.getByText('Clínica NutriVida')).toBeInTheDocument();
    expect(screen.getByText(/Av. Alemania 0820, Temuco/i)).toBeInTheDocument();
  });

  test('Debe mostrar los horarios de atención', () => {
    render(<Footer />);

    expect(screen.getByText('Horarios de Atención')).toBeInTheDocument();
    expect(screen.getByText(/Lunes a Viernes: 08:30 - 19:30 hrs/i)).toBeInTheDocument();
  });
});
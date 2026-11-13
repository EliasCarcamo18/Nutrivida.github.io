import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithRouter } from './test/renderWithRouter';
import App from './App';

describe('App Root Component', () => {
  it('renderiza la aplicación principal correctamente', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByText(/NutriVida/i).length).toBeGreaterThan(0);
  });
});

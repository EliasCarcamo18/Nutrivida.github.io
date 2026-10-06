import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { HashRouter } from 'react-router';
import App from './App';

describe('App Root Component', () => {
  test('renders NutriVida brand header correctly', () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );

    // Buscar específicamente el enlace del Navbar con el texto NutriVida
    const brandLink = screen.getByRole('link', { name: /^NutriVida$/i });
    expect(brandLink).toBeInTheDocument();
  });
});
import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../test/renderWithRouter';
import { Navbar } from './Navbar';

describe('Componente Navbar', () => {
  it('renderiza la marca NutriVida y todos los enlaces de navegación con sus rutas', () => {
    renderWithRouter(<Navbar />);

    expect(screen.getByText('NutriVida')).toHaveAttribute('href', '#/');
    expect(screen.getByText('Inicio')).toHaveAttribute('href', '#/');
    expect(screen.getByText('Servicios')).toHaveAttribute('href', '#/servicios');
    expect(screen.getByText('Nosotros')).toHaveAttribute('href', '#/nosotros');
    expect(screen.getByText('Contacto')).toHaveAttribute('href', '#/contacto');
    expect(screen.getByText('Blog')).toHaveAttribute('href', '#/blog');
    expect(screen.getByText('Ingresar')).toHaveAttribute('href', '#/login');
  });

  it('abre y cierra el menú móvil al hacer clic en el botón hamburguesa', () => {
    const { container } = renderWithRouter(<Navbar />);

    const toggleBtn = screen.getByLabelText('Abrir menú de navegación');
    const navMenu = container.querySelector('.navbar-menu');

    expect(navMenu).not.toHaveClass('is-open');

    fireEvent.click(toggleBtn);
    expect(navMenu).toHaveClass('is-open');

    fireEvent.click(toggleBtn);
    expect(navMenu).not.toHaveClass('is-open');
  });

  it('cierra el menú móvil al hacer clic en un enlace de navegación', () => {
    const { container } = renderWithRouter(<Navbar />);

    const toggleBtn = screen.getByLabelText('Abrir menú de navegación');
    const navMenu = container.querySelector('.navbar-menu');

    fireEvent.click(toggleBtn);
    expect(navMenu).toHaveClass('is-open');

    fireEvent.click(screen.getByText('Servicios'));
    expect(navMenu).not.toHaveClass('is-open');
  });
});
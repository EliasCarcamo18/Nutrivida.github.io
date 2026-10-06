import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Contacto } from './Contacto';

describe('Pruebas en página <Contacto />', () => {
  test('Muestra un error si se intenta enviar el mensaje vacío', () => {
    render(<Contacto />);

    const botonEnviar = screen.getByRole('button', { name: /Enviar Consulta/i });
    fireEvent.click(botonEnviar);

    expect(screen.getByText(/El campo de mensaje es obligatorio/i)).toBeInTheDocument();
  });
});
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Reserva } from './Reserva';
import { crearCita } from '../services/api';

vi.mock('../services/api', () => ({
  crearCita: vi.fn(),
}));

describe('Página Reserva', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza el formulario y muestra errores si se envía vacío', () => {
    render(<Reserva />);

    fireEvent.click(screen.getByRole('button', { name: /Confirmar y Agendar Cita/i }));

    expect(screen.getByText('Por favor, selecciona la fecha de la cita.')).toBeInTheDocument();
    expect(screen.getByText('Por favor, elige una hora disponible de la lista.')).toBeInTheDocument();
    expect(screen.getByText('Por favor, describe brevemente el motivo de tu consulta antes de agendar.')).toBeInTheDocument();
    expect(crearCita).not.toHaveBeenCalled();
  });

  it('actualiza los horarios disponibles al cambiar de nutricionista', () => {
    const { container } = render(<Reserva />);
    const selects = container.querySelectorAll('select');

    fireEvent.change(selects[0], { target: { value: 'felipe' } });

    expect(screen.getByText('08:30 hrs')).toBeInTheDocument();
    expect(screen.getByText('17:30 hrs')).toBeInTheDocument();
  });

  it('envía la cita al backend y muestra alerta de éxito cuando los datos son válidos', async () => {
    crearCita.mockResolvedValueOnce({ id: 1 });
    const { container } = render(<Reserva />);

    const selects = container.querySelectorAll('select');
    const inputFecha = container.querySelector('input[type="date"]');
    const textareaMotivo = screen.getByPlaceholderText(/Evaluación nutricional deportiva/i);

    fireEvent.change(inputFecha, { target: { value: '2026-11-25' } });
    fireEvent.change(selects[1], { target: { value: '10:30 hrs' } });
    fireEvent.change(textareaMotivo, { target: { value: 'Control nutricional mensual' } });

    fireEvent.click(screen.getByRole('button', { name: /Confirmar y Agendar Cita/i }));

    await waitFor(() => {
      expect(crearCita).toHaveBeenCalledWith({
        especialista: 'Nut. Carolina Fuentes M. (Obesidad y síndrome metabólico)',
        fecha: '2026-11-25',
        hora: '10:30 hrs',
        motivo: 'Control nutricional mensual',
      });
      expect(screen.getByRole('alert')).toHaveTextContent(/Solicitud de cita enviada exitosamente/i);
    });
  });

  it('muestra alerta de error si falla la petición al servidor', async () => {
    crearCita.mockRejectedValueOnce(new Error('Fallo de red'));
    const { container } = render(<Reserva />);

    const selects = container.querySelectorAll('select');
    const inputFecha = container.querySelector('input[type="date"]');
    const textareaMotivo = screen.getByPlaceholderText(/Evaluación nutricional deportiva/i);

    fireEvent.change(inputFecha, { target: { value: '2026-11-25' } });
    fireEvent.change(selects[1], { target: { value: '09:00 hrs' } });
    fireEvent.change(textareaMotivo, { target: { value: 'Primera consulta' } });

    fireEvent.click(screen.getByRole('button', { name: /Confirmar y Agendar Cita/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/No se pudo conectar con el servidor/i);
    });
  });
});

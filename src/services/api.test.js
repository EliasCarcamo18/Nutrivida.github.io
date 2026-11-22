import { describe, it, expect, vi, beforeEach } from 'vitest';
import { obtenerHorasOcupadas, crearCita, enviarMensajeContacto, loginUsuario } from './api';

describe('Servicio API REST (api.js)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('obtenerHorasOcupadas debe retornar las horas ocupadas cuando la respuesta es exitosa', async () => {
    const mockHoras = ['09:00 hrs', '15:00 hrs'];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockHoras,
    });

    const resultado = await obtenerHorasOcupadas('Nutrición Deportiva', '2026-11-20');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/v1/citas/ocupadas?'));
    expect(resultado).toEqual(mockHoras);
  });

  it('obtenerHorasOcupadas debe lanzar un error si el servidor responde con fallo', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ mensaje: 'Error al consultar disponibilidad' }),
    });

    await expect(obtenerHorasOcupadas('Nutrición Deportiva', '2026-11-20'))
      .rejects.toThrow('Error al consultar disponibilidad');
  });

  it('crearCita debe enviar una petición POST con los datos en JSON', async () => {
    const nuevaCita = {
      nombrePaciente: 'Carlos Ruiz',
      email: 'carlos@mail.com',
      telefono: '+56912345678',
      fechaCita: '2026-11-22 10:30 hrs',
      servicio: 'Nutrición Deportiva',
    };
    const respuestaBackend = { id: 10, ...nuevaCita };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => respuestaBackend,
    });

    const resultado = await crearCita(nuevaCita);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/citas'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaCita),
      })
    );
    expect(resultado).toEqual(respuestaBackend);
  });

  it('crearCita debe lanzar un error si el servidor falla', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    await expect(crearCita({ nombrePaciente: 'Test' }))
      .rejects.toThrow('Error al registrar la cita en el servidor.');
  });

  it('enviarMensajeContacto debe enviar una petición POST a /contacto', async () => {
    const mensaje = { nombre: 'Laura', email: 'laura@mail.com', mensaje: 'Consulta nutricional' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'OK' }),
    });

    const resultado = await enviarMensajeContacto(mensaje);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/contacto'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(mensaje),
      })
    );
    expect(resultado).toEqual({ status: 'OK' });
  });

  it('enviarMensajeContacto debe lanzar un error si el servidor falla', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    await expect(enviarMensajeContacto({ nombre: 'Test' }))
      .rejects.toThrow('Error al enviar el mensaje de contacto.');
  });

  it('loginUsuario debe autenticar y devolver los datos con token JWT', async () => {
    const mockAuth = { token: 'jwt-token-123', email: 'admin@nutrivida.cl', role: 'ADMINISTRADOR' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockAuth,
    });

    const resultado = await loginUsuario('admin@nutrivida.cl', 'Admin1234!');
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/v1/auth/login'),
      expect.objectContaining({ method: 'POST' })
    );
    expect(resultado.role).toBe('ADMINISTRADOR');
  });
});
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { obtenerCitas, crearCita, enviarMensajeContacto } from './api';

describe('Servicio API REST (api.js)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('obtenerCitas debe retornar la lista de citas cuando la respuesta es exitosa', async () => {
    const mockCitas = [{ id: 1, paciente: 'Ana Pérez', fecha: '2026-11-20' }];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockCitas,
    });

    const resultado = await obtenerCitas();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/v1/citas'));
    expect(resultado).toEqual(mockCitas);
  });

  it('obtenerCitas debe lanzar un error si el servidor responde con fallo', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    await expect(obtenerCitas()).rejects.toThrow('Error al obtener las citas');
  });

  it('crearCita debe enviar una petición POST con los datos en JSON', async () => {
    const nuevaCita = { nombre: 'Carlos Ruiz', email: 'carlos@mail.com', fecha: '2026-11-22' };
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

  it('enviarMensajeContacto debe enviar una petición POST a /contacto', async () => {
    const mensaje = { nombre: 'Laura', correo: 'laura@mail.com', mensaje: 'Consulta nutricional' };
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
  it('crearCita debe lanzar un error si el servidor falla', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    await expect(crearCita({ nombre: 'Test' })).rejects.toThrow('Error al registrar la cita');
  });

  it('enviarMensajeContacto debe lanzar un error si el servidor falla', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    await expect(enviarMensajeContacto({ nombre: 'Test' })).rejects.toThrow('Error al enviar el mensaje de contacto');
  });
});
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { obtenerUsuarios } from './usuarios';

global.fetch = vi.fn();

describe('Servicio de Usuarios (usuarios.js)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe obtener la lista de usuarios correctamente', async () => {
    const mockUsuarios = [
      { id: 1, nombre: 'Admin NutriVida', email: 'admin@nutrivida.cl', rol: 'ADMINISTRADOR', activo: true },
      { id: 2, nombre: 'Nut. Carolina Fuentes', email: 'cfuentes@nutrivida.cl', rol: 'NUTRICIONISTA', activo: true }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsuarios,
    });

    const usuarios = await obtenerUsuarios('token-falso-jwt');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(usuarios).toEqual(mockUsuarios);
  });
});
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { obtenerServicios } from './servicios';

global.fetch = vi.fn();

describe('Servicio de Catálogo (servicios.js)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe retornar la lista de servicios correctamente', async () => {
    const mockServicios = [
      { codigo: 'CN001', nombre: 'Primera consulta nutricional', precio: 35000 },
      { codigo: 'PL001', nombre: 'Plan pérdida de peso (1 mes)', precio: 65000 }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockServicios,
    });

    const resultado = await obtenerServicios();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(resultado).toEqual(mockServicios);
  });
});
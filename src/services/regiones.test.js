import { describe, it, expect } from 'vitest';
import { obtenerRegiones } from './regiones';

describe('Servicio de Regiones (regiones.js)', () => {
  it('debe incluir Temuco dentro de la Region de La Araucania', async () => {
    const regiones = await obtenerRegiones();
    const araucania = regiones.find((r) => r.id === '10');
    expect(araucania).toBeDefined();
    expect(araucania.comunas).toContain('Temuco');
  });
});
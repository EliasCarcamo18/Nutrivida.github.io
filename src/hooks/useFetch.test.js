import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from './useFetch';

describe('Hook useFetch', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('obtiene los datos correctamente y cambia loading a false', async () => {
    const mockData = [{ id: 1, nombre: 'Evaluación Nutricional' }];
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetch('http://localhost:8080/api/servicios'));

    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('captura y expone el mensaje de error cuando res.ok es false', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => useFetch('http://localhost:8080/api/error'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Error al conectar con el servidor');
  });

  it('ignora errores AbortError y cancela la petición al desmontar el hook', async () => {
    let capturedSignal;
    const abortError = new Error('Petición cancelada');
    abortError.name = 'AbortError';

    global.fetch = vi.fn().mockImplementationOnce((_url, options) => {
      capturedSignal = options.signal;
      return Promise.reject(abortError);
    });

    const { result, unmount } = renderHook(() => useFetch('http://localhost:8080/api/cancelar'));

    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(result.current.error).toBeNull();

    unmount();
    expect(capturedSignal.aborted).toBe(true);
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { ProtectedRoute } from './ProtectedRoute';

describe('Componente ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirige a /login cuando no hay usuario autenticado en localStorage', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/login" element={<div>Página de Login</div>} />
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin" element={<div>Panel Admin</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Página de Login')).toBeInTheDocument();
  });

  it('redirige a / cuando el usuario no tiene el rol permitido', () => {
    localStorage.setItem('nutrivida_user', JSON.stringify({ nombre: 'Juan', role: 'PACIENTE' }));

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/" element={<div>Inicio Público</div>} />
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin" element={<div>Panel Admin</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Inicio Público')).toBeInTheDocument();
  });

  it('renderiza la ruta protegida cuando el usuario tiene el rol permitido', () => {
    localStorage.setItem('nutrivida_user', JSON.stringify({ nombre: 'Admin', role: 'ADMIN' }));

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin" element={<div>Panel Admin</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Panel Admin')).toBeInTheDocument();
  });
});

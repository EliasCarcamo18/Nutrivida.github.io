import { test, expect } from '@playwright/test';

test.describe('Módulo de Administración', () => {
  test('debe redirigir al login si un usuario no autenticado intenta acceder a /admin', async ({ page }) => {
    await page.goto('/#/admin');
    await expect(page).toHaveURL(/.*login/);
  });

  test('debe cargar la lista de usuarios para el rol ADMINISTRADOR', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('token', 'fake-jwt-admin-token');
      localStorage.setItem('rol', 'ADMINISTRADOR');
    });

    await page.route('**/api/v1/usuarios', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, nombre: 'Admin NutriVida', email: 'admin@nutrivida.cl', rol: 'ADMINISTRADOR', activo: true }
      ])
    }));

    await page.goto('/#/admin');
    await expect(page.locator('h2')).toContainText('Panel de Administración');
    await expect(page.locator('table')).toContainText('Admin NutriVida');
  });
});
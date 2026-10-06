import { test, expect } from '@playwright/test';

test.describe('Flujo de Reservas', () => {
  test('debe permitir solicitar una cita si el paciente esta autenticado', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('rol', 'PACIENTE');
    });

    await page.goto('/#/reserva');
    await page.selectOption('select[name="nutricionistaId"]', 'NUT001');
    await page.fill('input[type="datetime-local"]', '2026-11-15T10:00');
    await page.fill('textarea[name="motivo"]', 'Evaluación nutricional de control');
    await page.click('button[type="submit"]');

    await expect(page.locator('.alert-success')).toContainText('Solicitud de cita enviada exitosamente');
  });
});
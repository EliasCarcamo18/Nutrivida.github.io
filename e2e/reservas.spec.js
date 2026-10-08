import { test, expect } from '@playwright/test';

test.describe('Flujo de Reservas', () => {
  test('debe permitir solicitar una cita si el paciente esta autenticado', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('nutrivida_user', JSON.stringify({
        id: 2,
        nombre: 'Paciente Demo',
        email: 'paciente@nutrivida.cl',
        role: 'PACIENTE'
      }));
    });

    await page.goto('/#/reserva');

    await page.locator('select').nth(0).selectOption('carolina');
    await page.locator('input[type="date"]').fill('2026-11-15');
    await page.locator('select').nth(1).selectOption('09:00 hrs');
    await page.locator('textarea').fill('Evaluación nutricional de control');
    await page.getByRole('button', { name: /confirmar y agendar cita/i }).click();

    await expect(page.locator('.alert-success')).toContainText('Solicitud de cita enviada exitosamente');
  });
});
import { test, expect } from '@playwright/test';

test.describe('Navegación general del sitio', () => {
  test('debe navegar hacia la pagina de servicios desde la barra superior', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Servicios');
    await expect(page).toHaveURL(/.*servicios/);
    await expect(page.locator('h2')).toContainText('Catálogo de Servicios');
  });
});
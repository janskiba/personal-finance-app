import { test, expect } from '@playwright/test';

test.describe('Theme toggle', () => {
  test('should switch from light to dark mode', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await page.getByTestId('toggle-theme-button').click();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('should switch from dark back to light mode', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('toggle-theme-button').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.getByTestId('toggle-theme-button').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('should persist chosen theme after page reload', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('toggle-theme-button').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.reload();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});

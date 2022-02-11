import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
});

test('application homepage', async ({ page }) => {
  await page.goto('/');
  const title = page.locator('div.content span.title');
  await expect(title).toHaveText('FE Testing Workshop app is running!');
});

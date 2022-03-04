import { test, expect } from '@playwright/test';

test('application homepage', async ({ page }) => {
  await page.goto('/');
  const title = page.locator('p');
  await expect(title).toHaveText('Welcome to our little Frontend Testing Workshop!');
});

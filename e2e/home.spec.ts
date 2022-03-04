import { test, expect } from '@playwright/test';
import { text } from 'stream/consumers';

test.describe('Application homepage', () => {
  test('it should render the greeting', async ({ page }) => {
    await page.goto('/');
    const title = page.locator('p');
    await expect(title).toHaveText('Welcome to our little Frontend Testing Workshop!');
  });

  test('it should render the headline', async ({ page }) => {
    // do this after fixing the a11y spec
  });
});

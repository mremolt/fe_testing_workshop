import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('application homepage a11y violations', async ({ page }) => {
  page.setDefaultTimeout(20000);
  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();
  // console.log('violations', results.violations);

  // TODO: bring this down to zero :)
  expect(results.violations.length).toBe(1);
});

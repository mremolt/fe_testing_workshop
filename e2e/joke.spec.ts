import { test, expect } from '@playwright/test';
import { JokePage } from './support/joke.page';

test.describe('joke category page', () => {
  let jokePage: JokePage;

  test.beforeEach(async ({ page }) => {
    jokePage = new JokePage(page);
    await jokePage.goto();
    await jokePage.joke.waitFor();
  });

  test('page is rendered', () => {
    expect(jokePage.heading).toHaveText('Random joke for category "celebrity"');
  });

  test('a random joke is rendered', async () => {
    expect(jokePage.joke).toBeVisible();

    const joke = await jokePage.joke.textContent();
    expect(joke).toMatch('Chuck Norris');
  });

  test('clicking on the reload button loads a new random joke', async () => {
    /*
     * think, why is this test fragile?
     */
    const joke = await jokePage.joke.textContent();
    expect(joke?.length).toBeGreaterThan(0);

    await jokePage.reloadButton.click();
    const newJoke = await jokePage.joke.textContent();

    expect(joke).not.toEqual(newJoke);
  });
});

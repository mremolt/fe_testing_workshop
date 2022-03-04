import { test, expect } from '@playwright/test';
import { JokesPage } from './support/jokes.page';

test.describe('jokes list page', () => {
  let jokesPage: JokesPage;

  test.beforeEach(async ({ page }) => {
    jokesPage = new JokesPage(page);
    await jokesPage.goto();
    await jokesPage.categories.first().waitFor();
  });

  test('page is rendered', () => {
    expect(jokesPage.heading).toHaveText('Joke Categories');
  });

  test('movie category is rendered', () => {
    const movie = jokesPage.categories.locator('text=movie');
    expect(movie).toBeVisible();
  });

  test('clicking on a category navigates to the category joke page', async ({ page }) => {
    const movie = jokesPage.categories.locator('text=movie');

    await movie.click();
    expect(page.locator('h1')).toHaveText('Random joke for category "movie"');
  });
});

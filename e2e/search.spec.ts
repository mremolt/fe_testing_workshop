import { test, expect } from '@playwright/test';
import { SearchPage } from './support/search.page';

test.describe('search page', () => {
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.goto();
  });

  test('page is rendered', () => {
    expect(searchPage.heading).toHaveText('Search');
  });

  test('searching for a query renders the resulting jokes', async () => {
    await searchPage.search('kick');

    const jokes = await searchPage.jokes.allTextContents();

    expect(jokes.length).toBeGreaterThan(100);
    expect(jokes).toEqual(
      expect.arrayContaining(['Chuck Norris can hammer an nail into the wall with a roundhouse kick'])
    );
  });
});

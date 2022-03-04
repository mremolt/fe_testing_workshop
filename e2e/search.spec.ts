import { test, expect } from '@playwright/test';
import { SearchPage } from './support/search.page';

test.describe('search page', () => {
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.goto();
  });

  test('page is rendered', () => {
    expect(searchPage.heading).toHaveText('Search for Jokes');
  });

  test('search is disabled for an invalid search term ', async () => {
    await searchPage.searchBox.fill('this is far too long of a text');

    expect(searchPage.searchButton).toBeDisabled();
  });

  test('search is enabled for a valid search term ', async () => {
    await searchPage.searchBox.fill('pain');

    expect(searchPage.searchButton).toBeEnabled();
  });

  test('searching for a query renders the resulting jokes', async () => {
    await searchPage.search('kick');

    const jokes = await searchPage.jokes.allTextContents();

    expect(jokes.length).toBeGreaterThan(100);
    expect(jokes).toEqual(
      expect.arrayContaining(['Chuck Norris can hammer an nail into the wall with a roundhouse kick'])
    );
  });

  test('searching for a query with no match should render an empty list', async () => {});
});

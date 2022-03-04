import { Locator, Page, Response } from '@playwright/test';

export class SearchPage {
  public readonly heading: Locator = this.page.locator('h1');
  public readonly searchBox: Locator = this.page.locator('input[type="search"]');
  public readonly searchButton: Locator = this.page.locator('button :text("Search")');
  public readonly jokes: Locator = this.page.locator('.joke');

  constructor(private readonly page: Page) {}

  public goto(): Promise<Response | null> {
    return this.page.goto('/search');
  }

  public async search(query: string) {
    await this.searchBox.fill(query);
    await this.searchButton.click();
    await this.jokes.first().waitFor();
  }
}

import { Locator, Page, Response } from '@playwright/test';

export class JokePage {
  public readonly heading: Locator = this.page.locator('h1');
  public readonly joke: Locator = this.page.locator('.joke');
  public readonly reloadButton: Locator = this.page.locator('text="load new random joke"');

  constructor(private readonly page: Page) {}

  public goto(category = 'celebrity'): Promise<Response | null> {
    return this.page.goto(`/jokes/${category}`);
  }
}

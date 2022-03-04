import { Locator, Page, Response } from '@playwright/test';

export class JokesPage {
  public readonly heading: Locator = this.page.locator('h1');
  public readonly categoriesList: Locator = this.page.locator('mat-nav-list.categories');
  public readonly categories: Locator = this.categoriesList.locator('.category');

  constructor(private readonly page: Page) {}

  public goto(): Promise<Response | null> {
    return this.page.goto('/jokes');
  }
}

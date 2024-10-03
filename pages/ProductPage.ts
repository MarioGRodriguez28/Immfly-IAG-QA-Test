import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://highlifeshop.com/cafe');
  }

  async acceptCookies() {
    await this.page.getByRole('button', { name: 'DECLINE ALL NON-ESSENTIAL' }).click();
  }

  async sortProductsBy(option: string) {
    await this.page.getByRole('img', { name: 'sort' }).click();
    await this.page.locator('li').filter({ hasText: option }).click();
  }

  async getProductNames() {
    return await this.page.locator('.product-name-selector').allTextContents();
  }
}

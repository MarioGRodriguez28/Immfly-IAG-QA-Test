import { Page } from '@playwright/test';

export class ProductPage {
  // Constructor initializes the Page object for interactions
  constructor(private page: Page) {}

  // Method to navigate to the specified product page (in this case, the 'Cafe' section)
  async navigate() {
    await this.page.goto('https://highlifeshop.com/cafe');
  }

  // Method to handle and click the button to decline non-essential cookies
  async acceptCookies() {
    await this.page.getByRole('button', { name: 'DECLINE ALL NON-ESSENTIAL' }).click();
  }

  // Method to sort products by a specified option (e.g., 'Product A-Z' or 'Product Z-A')
  async sortProductsBy(option: string) {
    await this.page.getByRole('img', { name: 'sort' }).click(); 
    await this.page.locator('li').filter({ hasText: option }).click(); // Select the desired sorting option
  }

 // Get the list of product prices
 async getProductPrices(): Promise<string[]> {
    return await this.page.locator('.product-price-selector').allTextContents();
}

  // Method to get the names of all products listed on the page
  async getProductNames() {
    // Return an array of text contents from all elements with the class 'product-name-selector'
    return await this.page.locator('.product-name-selector').allTextContents();
  }
}

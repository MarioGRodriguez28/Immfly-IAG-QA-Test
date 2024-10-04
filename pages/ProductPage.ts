import { Page } from '@playwright/test';

export class ProductPage {
    constructor(private page: Page) {}

    // Navigate to the product page
    async navigate() {
        await this.page.goto('https://highlifeshop.com/cafe');
    }

    // Accept cookies by clicking the "DECLINE ALL NON-ESSENTIAL" button
    async acceptCookies() {
        await this.page.getByRole('button', { name: 'DECLINE ALL NON-ESSENTIAL' }).click();
    }

    // Sort products by the provided option (e.g., "Product A-Z", "Price Low to High")
    async sortProductsBy(option: string) {
        await this.page.getByRole('img', { name: 'sort' }).click(); // Click the sort icon
        await this.page.locator('li').filter({ hasText: option }).click(); // Select the sorting option
    }

    // Retrieve the prices of the products
    async getProductPrices(): Promise<string[]> {
        return await this.page.locator('.product-price-selector').allTextContents();
    }

    // Retrieve the names of the products
    async getProductNames(): Promise<string[]> {
        return await this.page.locator('.product-name-selector').allTextContents();
    }

  
}

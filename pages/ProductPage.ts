import { Page } from '@playwright/test';

export class ProductPage {
    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('https://highlifeshop.com/cafe'); // Navegar a la página del producto
    }

    async acceptCookies() {
        await this.page.getByRole('button', { name: 'DECLINE ALL NON-ESSENTIAL' }).click(); // Aceptar cookies
    }

    async sortProductsBy(option: string) {
        await this.page.getByRole('img', { name: 'sort' }).click(); // Hacer clic en el ícono de orden
        await this.page.locator('li').filter({ hasText: option }).click(); // Seleccionar opción de orden
    }

    async getProductPrices(): Promise<string[]> {
        return await this.page.locator('.product-price-selector').allTextContents(); // Obtener precios de productos
    }

    async getProductNames(): Promise<string[]> {
        return await this.page.locator('.product-name-selector').allTextContents(); // Obtener nombres de productos
    }

    async getNewArrivals(): Promise<string[]> {
        return await this.page.locator('.new-arrival-selector').allTextContents(); // Obtener nombres de nuevos llegados
    }
}

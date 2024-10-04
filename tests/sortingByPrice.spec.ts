import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test.describe('Sorting by Product Price', () => {

  test('should sort products by price low to high', async ({ page }) => {
      const productPage = new ProductPage(page);

      await productPage.navigate();  // Arrange
      await productPage.acceptCookies();  // Act

      await productPage.sortProductsBy('Price Low to High');
      const productPrices = await productPage.getProductPrices();
      const sortedPrices = [...productPrices].sort((a, b) => parseFloat(a) - parseFloat(b));

      // Assert
      expect(productPrices).toEqual(sortedPrices);
  });

  test('should sort products by price high to low', async ({ page }) => {
      const productPage = new ProductPage(page);

      await productPage.navigate();  // Arrange
      await productPage.acceptCookies();  // Act

      await productPage.sortProductsBy('Price High to Low');
      const productPrices = await productPage.getProductPrices();
      const sortedPrices = [...productPrices].sort((a, b) => parseFloat(b) - parseFloat(a));

      // Assert
      expect(productPrices).toEqual(sortedPrices);
  });
});

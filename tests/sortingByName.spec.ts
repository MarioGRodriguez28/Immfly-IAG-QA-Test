import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test('should sort products A-Z', async ({ page }) => {
  const productPage = new ProductPage(page);

  // Navigate to the page and accept cookies
  await productPage.navigate();
  await productPage.acceptCookies();

  // Sort the products from A to Z
  await productPage.sortProductsBy('Product A-Z');

  // Verify that the products are correctly sorted
  const productNames = await productPage.getProductNames();
  const sortedNames = [...productNames].sort();
  
  // Expect the product names to match the sorted names
  expect(productNames).toEqual(sortedNames);
});

test('should sort products Z-A', async ({ page }) => {
  const productPage = new ProductPage(page);

  // Navigate to the page and accept cookies
  await productPage.navigate();
  await productPage.acceptCookies();

  // Sort the products from Z to A
  await productPage.sortProductsBy('Product Z-A');

  // Verify that the products are correctly sorted
  const productNames = await productPage.getProductNames();
  const sortedNames = [...productNames].sort().reverse();
  
  // Expect the product names to match the reversed sorted names
  expect(productNames).toEqual(sortedNames);
});

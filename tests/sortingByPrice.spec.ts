import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { sendErrorToGoogleChat } from '../utils/googleChatReporter';

// General description for sorting by price test
test.describe('Sorting by Price', () => {
    test('should sort products by price low to high', async ({ page }) => {
        const productPage = new ProductPage(page);
        const testName = 'Sorting by Price';

        // Array to keep track of steps
        const steps = [
            'Navigate to the page',
            'Accept cookies',
            'Sort products by Price Low to High',
            'Get sorted prices',
            'Assert that prices are sorted correctly'
        ];

        try {
            await productPage.navigate(); // Step 1
            await productPage.acceptCookies(); // Step 2
            await productPage.sortProductsBy('Price Low to High'); // Step 3

            const sortedPrices = await productPage.getProductPrices(); // Step 4
            const expectedSortedPrices = [...sortedPrices].sort((a, b) => parseFloat(a) - parseFloat(b)); // Sort expected prices for comparison
            
            expect(sortedPrices).toEqual(expectedSortedPrices); // Step 5

        } catch (error) {
            await handleError(testName, error, steps);
        }
    });
});

// Handle errors and send to Google Chat with step details
async function handleError(testName: string, error: unknown, steps: string[]) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const stepIndex = steps.length;

    // Log error to console for local debugging
    console.error(`Test "${testName}" failed at step: ${steps[stepIndex - 1]} | Error: ${errorMessage}`);

    // Send error report to Google Chat
    await sendErrorToGoogleChat(
        testName,
        `An error occurred during: ${steps.slice(0, stepIndex).join(', ')}`,
        errorMessage
    );

    throw error; // Rethrow the error for Playwright to handle
}

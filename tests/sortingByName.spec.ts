import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { sendErrorToGoogleChat } from '../utils/googleChatReporter';

// General description for sorting by name test
test.describe('Sorting by Name', () => {
    test('should order products from A to Z', async ({ page }) => {
        const productPage = new ProductPage(page);
        const testName = 'Sorting by Name';

        // Array to keep track of steps
        const steps = [
            'Navigate to the page',
            'Accept cookies',
            'Sort products by Product A-Z',
            'Get sorted product names',
            'Verify products are sorted'
        ];

        try {
            await productPage.navigate(); // Step 1
            await productPage.acceptCookies(); // Step 2
            await productPage.sortProductsBy('Product A-Z'); // Step 3

            const sortedNames = await productPage.getProductNames(); // Step 4
            const expectedSortedNames = [...sortedNames].sort(); // Sort expected names for comparison
            
            expect(sortedNames).toEqual(expectedSortedNames); // Step 5

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

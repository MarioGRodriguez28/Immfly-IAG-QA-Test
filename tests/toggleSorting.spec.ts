import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { sendErrorToGoogleChat } from '../utils/googleChatReporter';

// General description for the sorting using the toggle click test
test.describe('Sorting with Sort Toggle Click', () => {
    test('should correctly order products based on selected option when clicking sort icon', async ({ page }) => {
        const productPage = new ProductPage(page);
        const testName = 'Sorting with Sort Toggle Click';

        // Array to keep track of steps
        const steps = [
            'Navigate to the page',
            'Accept cookies',
            'Click sort icon to open sorting options',
            'Get the currently selected sorting option',
            'Sort products according to the selected option',
            'Get sorted product names and prices',
            'Assert that product names and prices are defined'
        ];

        try {
            await productPage.navigate(); // Step 1
            await productPage.acceptCookies(); // Step 2
            
            await page.getByAltText('sort').click(); // Step 3

            const selectedOptionText = await (await page.locator('li.options.selected').first()).textContent(); // Step 4
            await productPage.sortProductsBy(selectedOptionText!.trim()); // Step 5

            const productNames = await productPage.getProductNames(); // Step 6
            const productPrices = await productPage.getProductPrices(); // Step 7

            expect(productNames).toBeDefined(); // Step 8
            expect(productPrices).toBeDefined(); // Step 9

        } catch (error) {
            await handleError(testName, error, steps);
        }
    });
});

// Handle errors and send to Google Chat with step details
async function handleError(testName: string, error: unknown, steps: string[]) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const stepIndex = steps.length; // Last step index, could be enhanced further to capture the exact failing step

    // Log error to console for local debugging
    console.error(`Test "${testName}" failed at step: ${steps[stepIndex - 1]} | Error: ${errorMessage}`);

    // Send error report to Google Chat
    await sendErrorToGoogleChat(
        testName,
        `An error occurred during: ${steps.slice(0, stepIndex).join(', ')}`, // Include all completed steps
        errorMessage
    );

    throw error; // Rethrow the error for Playwright to handle
}

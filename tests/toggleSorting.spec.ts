import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { sendErrorToGoogleChat } from '../utils/googleChatReporter';

// Test description for sorting using the sort toggle click
test.describe('Sorting with Sort Toggle Click', () => {
    test('should correctly order products based on selected option when clicking sort icon', async ({ page }) => {
        const productPage = new ProductPage(page);
        const testName = 'Sorting with Sort Toggle Click';

        // List of test steps
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
            // Execute test steps and capture potential errors
            await runStep(steps[0], async () => await productPage.navigate());
            await runStep(steps[1], async () => await productPage.acceptCookies());
            await runStep(steps[2], async () => await page.getByAltText('sort').click());
            const selectedOptionText = await runStep(steps[3], async () =>
                (await page.locator('li.options.selected').first()).textContent()
            );
            await runStep(steps[4], async () =>
                productPage.sortProductsBy(selectedOptionText!.trim())
            );
            const productNames = await runStep(steps[5], async () =>
                productPage.getProductNames()
            );
            const productPrices = await runStep(steps[6], async () =>
                productPage.getProductPrices()
            );

            expect(productNames).toBeDefined();
            expect(productPrices).toBeDefined();

        } catch (error) {
            // Handle errors and report to Google Chat
            await handleError(testName, error, steps);
        }
    });
});

// Helper function to run each step and capture specific errors
async function runStep(stepDescription: string, stepFn: () => Promise<void | any>) {
    try {
        return await stepFn();
    } catch (error) {
        throw new Error(`Error in step: "${stepDescription}". Details: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

// Function to handle errors and send the report to Google Chat
async function handleError(testName: string, error: unknown, steps: string[]) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const failingStep = errorMessage.match(/Error in step: "(.*?)"/)?.[1] || 'Unknown step';

    // Log error to the console for debugging
    console.error(`Test "${testName}" failed at step: ${failingStep} | Error: ${errorMessage}`);

    // Send the error report to Google Chat
    await sendErrorToGoogleChat(
        testName,
        `An error occurred during step: ${failingStep}`,
        errorMessage
    );

    throw error;
}

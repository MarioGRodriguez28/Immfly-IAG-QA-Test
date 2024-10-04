import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { sendErrorToGoogleChat } from '../utils/googleChatReporter';

// Test description for sorting by name
test.describe('Sorting by Name', () => {
    test('should order products from A to Z', async ({ page }) => {
        const productPage = new ProductPage(page);
        const testName = 'Sorting by Name';

        // List of test steps
        const steps = [
            'Navigate to the page',
            'Accept cookies',
            'Sort products by Product A-Z',
            'Get sorted product names',
            'Verify products are sorted'
        ];

        try {
            // Execute test steps and capture potential errors
            await runStep(steps[0], async () => await productPage.navigate());
            await runStep(steps[1], async () => await productPage.acceptCookies());
            await runStep(steps[2], async () => await productPage.sortProductsBy('Product A-Z'));
            const sortedNames = await runStep(steps[3], async () => productPage.getProductNames());
            const expectedSortedNames = [...sortedNames].sort(); // Expected sorted names

            expect(sortedNames).toEqual(expectedSortedNames); // Assert names are sorted

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

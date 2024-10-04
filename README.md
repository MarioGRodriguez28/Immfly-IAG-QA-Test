# Immfly IAG - QA Automation Project

## Overview

This project is a **Quality Assurance Automation** suite designed to test the product pages on the **High Life Shop** website. The project focuses on automating the validation of product sorting by different criteria, such as **name** and **price**. It uses **Playwright** for browser automation and integrates with **Google Chat** to send real-time error reports.

## Features

- **Automated Tests**: Tests for sorting products by:
  - Name (A-Z)
  - Price (Low to High)
  - Custom sorting via the sort toggle
- **Error Reporting**: Automatically sends error reports to **Google Chat** when a test fails.
- **Page Object Model (POM)**: The project uses the POM design pattern for better test maintainability.

## Project Structure

Here is an overview of the project directory structure:
Immfly-IAG-QA-Test/
├── html-report/                # Generated Playwright HTML test reports
├── node_modules/               # Node.js dependencies (auto-generated)
├── pages/                      # Page Object Models (POM)
│   └── ProductPage.ts          # Product page interactions (e.g., sorting, fetching product data)
├── test-results/               # Test results generated after running tests
├── tests/                      # Test files for different scenarios
│   ├── sortingByName.spec.ts   # Test for sorting products by name
│   ├── sortingByPrice.spec.ts  # Test for sorting products by price
│   └── toggleSorting.spec.ts   # Test for sorting products via sort toggle
├── utils/                      # Utility functions and services
│   └── googleChatReporter.ts   # Sends error reports to Google Chat
├── package-lock.json           # Auto-generated dependency lock file
├── package.json                # Project configuration and dependencies
├── playwright.config.ts        # Playwright configuration file
├── README.md                   # Project documentation (this file)
├── tsconfig.json               # TypeScript configuration file



## Setup

### 1. Prerequisites

Before starting, ensure that the following tools are installed on your machine:

- **Node.js** (version 14.x or above)
- **npm** (Node Package Manager)

### 2. Installation

Clone the repository to your local machine:


    git clone https://github.com/MarioGRodriguez28/Immfly-IAG-QA-Test.git
    cd Immfly-IAG-QA-Test

**Next, install the required dependencies:**

    npm install
### 3. Running Tests

You can run all tests using the following command:

    npx playwright test

This command will run all test files located in the `tests/` directory. The results will be displayed in the terminal and an **HTML report** will be generated in the `html-report/` directory.

To run a specific test file, such as sorting by price, use:

    npx playwright test tests/sortingByPrice.spec.ts

### 4. Viewing Test Reports

After running tests, an HTML report will be generated, which you can view by running:

    npx playwright show-report

This command opens an interactive report in your browser, allowing you to inspect the test execution results.


### 5. Error Reporting to Google Chat

When a test fails, a report is automatically sent to a Google Chat space. The error message includes:

-   The **name of the test**.
-   The **specific step** where the error occurred.
-   The **error message** describing the failure.

#### Example Google Chat Message:

    Immfly IAG - QA Engineer Test:
    Test: Sorting by Price
    Step: Sort products by Price Low to High
    Error: Element not found for sorting option

This real-time error reporting allows the QA team to quickly identify and address issues.

## Writing New Tests

You can create new test files in the `tests/` directory. Each test should follow the Playwright syntax and leverage the Page Object Model (POM) from the `pages/ProductPage.ts` file.

Here is a simple test example:

    import { test, expect } from '@playwright/test';
    import { ProductPage } from '../pages/ProductPage';
    
    test.describe('Sorting by Name', () => {
        test('should order products from A to Z', async ({ page }) => {
            const productPage = new ProductPage(page);
            await productPage.navigate();
            await productPage.acceptCookies();
            await productPage.sortProductsBy('Product A-Z');
            
            const sortedNames = await productPage.getProductNames();
            const expectedNames = [...sortedNames].sort();
            expect(sortedNames).toEqual(expectedNames);
        });
    });

## Page Object Model (POM)

The `ProductPage.ts` file in the `pages/` directory contains methods for interacting with the product page:

-   `navigate()`: Navigates to the product page.
-   `acceptCookies()`: Handles cookie acceptance.
-   `sortProductsBy(option: string)`: Sorts products by the specified option (e.g., "Product A-Z", "Price Low to High").
-   `getProductPrices()`: Retrieves product prices.
-   `getProductNames()`: Retrieves product names.

### Example Usage:

    const productPage = new ProductPage(page);
    
    await productPage.navigate();
    await productPage.acceptCookies();
    await productPage.sortProductsBy('Product A-Z');
    const productNames = await productPage.getProductNames();

## Conclusion

This project provides a complete automation suite for testing product sorting functionality on the High Life Shop website. With Playwright for testing, modular page objects, and real-time Google Chat error reporting, it ensures efficient and maintainable QA processes.

Feel free to extend the test cases or customize the error reporting mechanism as per your needs.

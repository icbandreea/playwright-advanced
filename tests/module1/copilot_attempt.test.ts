// This test file is just to show that we can use AI to write tests, but as we can see the code is repetitive. 
// AI can generate Playwright tests quickly, but without a proper POM structure, it often reproduces duplicated locators, repeated logic, and poorly 
// maintainable code. While the generated tests may work, duplication grows rapidly, making the codebase harder and more expensive to maintain.

//With POM, shared locators and actions are centralized, so fixes only need to be made in one place. Without POM, the same issue may require updates 
// across many tests, increasing maintenance effort and AI token usage. 

import { test, expect } from '@playwright/test';
import { StockTradingPage } from '../module2/pages/StockTradingPage.js';


test.describe('Buy and Sell Stock', () => {

    test('Buy 1 stock, verify cash balance, then sell it', async ({ page }) => {

        // Navigate to the page
        await page.goto('index.html');

        // Get initial cash balance
        const initialCash = Number(await page.getByTestId('cash').textContent());

        // Select MSFT stock
        await page
            .getByTestId('stock-list')
            .getByRole('listitem')
            .filter({ hasText: 'MSFT' })
            .click();

        // Get the market price
        const marketPrice = Number(await page.getByTestId('stock-price').textContent());

        // Fill in limit price and quantity (buy 1 stock)
        await page.getByLabel('Limit Price').fill(marketPrice.toString());
        await page.getByLabel('Quantity').fill('1');

        // Click Buy button
        await page.getByRole('button', { name: 'Buy', exact: true }).click();

        // Verify cash balance decreased by the stock price
        const cashAfterBuy = Number(await page.getByTestId('cash').textContent());
        expect(cashAfterBuy).toBeCloseTo(initialCash - marketPrice, 2);

        // Now sell the 1 stock
        // Fill quantity for sale
        await page.getByLabel('Quantity').fill('1');

        // Click Sell button
        await page.getByRole('button', { name: 'Sell', exact: true }).click();

        // Verify cash balance is restored to initial amount
        const cashAfterSell = Number(await page.getByTestId('cash').textContent());
        expect(cashAfterSell).toBeCloseTo(initialCash, 2);

    });

    /** 
     * 3 things to make AI output useful:
     * 
     * 1. A high-quality LLM model
     * 2. A well structured propmt (invest some time into it!!)
     * 3. A high quality code base (for context)
     * 
     * */ 

    


    //Using AI with POM
    test('Same scenario, but with POM', async({page}) => {
        const stockPage = new StockTradingPage(page);

        // Navigate to the page
        await stockPage.goto();

        // Get initial cash balance
        const initialCash = Number(await stockPage.cashBalance().textContent());

        // Select MSFT stock
        await stockPage.ticker('MSFT').click();

        // Get the market price
        const marketPrice = Number(await stockPage.currentPrice().textContent());

        // Fill in limit price and quantity (buy 1 stock)
        await stockPage.limitPriceInput().fill(marketPrice.toString());
        await stockPage.quantityInput().fill('1');

        // Click Buy button
        await stockPage.buyButton().click();

        // Verify cash balance decreased by the stock price
        const cashAfterBuy = Number(await stockPage.cashBalance().textContent());
        expect(cashAfterBuy).toBeCloseTo(initialCash - marketPrice, 2);

        // Now sell the 1 stock
        // Fill quantity for sale
        await stockPage.quantityInput().fill('1');

        // Click Sell button
        await stockPage.sellButton().click();

        // Verify cash balance is restored to initial amount
        const cashAfterSell = Number(await stockPage.cashBalance().textContent());
        expect(cashAfterSell).toBeCloseTo(initialCash, 2);
    });

});

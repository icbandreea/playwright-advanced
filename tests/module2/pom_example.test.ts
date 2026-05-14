import {expect, test} from '@playwright/test';
import { StockTradingPage } from './pages/StockTradingPage.js';
import { StockTradingPage2 } from './pages/StockTradingPage2.js';
import { AnalyticsPage } from './pages/AnalyticsPage.js';
import type { Order } from './pages/types/Order.js';

test('POM Level 1 Demo - Attempt to buy more than available cash balance', async({page}) => {
    const stockTradingPage = new StockTradingPage(page);

    await stockTradingPage.goto();
    await stockTradingPage.ticker('GOOGL: Alphabet').click();
    await stockTradingPage.limitPriceInput().fill(await stockTradingPage.currentPrice().innerText());
    await stockTradingPage.quantityInput().fill('500');
    await stockTradingPage.buyButton().click();

    expect(stockTradingPage.actionError()).toBeVisible();
    expect(stockTradingPage.actionError()).toHaveText('Insufficient cash');

});

// In this case for bigger pages where we have a lot of locators, page classes will grow very big (CONS)
test('POM Level 2 Demo - same scenario - StockTradingPage2', async({page}) => {
    const stockTradingPage = new StockTradingPage2(page);

    await stockTradingPage.goto();
    await stockTradingPage.selectTicker('GOOGL: Alphabet');
    await stockTradingPage.enterPrice(await stockTradingPage.currentPrice().innerText());
    await stockTradingPage.enterQuantity('500');
    await stockTradingPage.clickBuy();

    expect(stockTradingPage.actionError()).toBeVisible();
    expect(stockTradingPage.actionError()).toHaveText('Insufficient cash');

});


test('Using navigation - StockTradingPage', async({page}) => {
    const stockTradingPage = new StockTradingPage(page);
    const analyticsPage = new AnalyticsPage(page); 

    await stockTradingPage.goto();
    const initialCash = Number(await stockTradingPage.cashBalance().textContent());
    
    // Select MSFT
    await stockTradingPage.ticker('MSFT').click();
    const marketPrice = Number(await stockTradingPage.currentPrice().textContent());
    await stockTradingPage.limitPriceInput().fill(marketPrice.toString());
    await stockTradingPage.quantityInput().fill('1');
    await stockTradingPage.buyButton().click();

    // Navigate to Analytics page
    await stockTradingPage.navigation().analyticsLink().click();

    const expectedCash = (initialCash - marketPrice).toFixed(2);
    await expect(analyticsPage.cashBalance()).toHaveText(expectedCash);

});

test('With Custom Order type', async({page}) => {
    const stockTradingPage = new StockTradingPage2(page);
    await stockTradingPage.goto();

    await stockTradingPage.selectTicker('AMZN');
    const marketPrice = Number(await stockTradingPage.currentPrice().textContent());

    const order: Order = {
        ticker: 'AMZN',
        price: marketPrice,
        quantity: 10,
        side: 'buy'
    };

    await stockTradingPage.placeOrder(order);
})
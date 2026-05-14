import {test, expect} from '../module2/pages/fixtures/base.js';

// Here are built'in fixtures
test('Built-in fixtures', async ({page, browser, request}) => {
    page.goto('');

    //browser is a higher level fixture that we can use to spawn a new context and configure it (in this case set the locale, timezone, etc)
    const ctx = browser.newContext({
        locale: 'es-ES',
        timezoneId: '....',
        javaScriptEnabled: false
    });

    // this fixture is used to send HTTP requests 
    const response = await request.post('');
});

test('Custom Fixtures page', async({stockPage}) => {

    await stockPage.goto();

    await stockPage.ticker('MSFT').click();

    const marketPrice = Number(await stockPage.currentPrice().textContent());

    await stockPage.limitPriceInput().fill(marketPrice.toString());
    await stockPage.quantityInput().fill('1000');
    await stockPage.buyButton().click();

    await expect(stockPage.actionError()).toBeVisible();
    await expect(stockPage.actionError()).toHaveText('Insufficient cash');

});
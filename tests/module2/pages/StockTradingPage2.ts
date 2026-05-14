import type{Locator, Page} from "@playwright/test";

// Encapsulating the locators + action
//function is typically a verb
export class StockTradingPage2 {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //playwright.config.ts file has the rest of the URL
    async goto() {
        await this.page.goto('index.html');
    }

    /* -------- Left column --------- */

    async selectTicker(ticker: string) {
        await this.page
            .getByTestId('stock-list')
            .getByRole('listitem')
            .filter({hasText: ticker})
            .click();
    }

    /* -------- Right column --------- */

    // Form for placing buy/sell orders
    currentPrice(): Locator {
        return this.page.getByTestId('stock-price');
    }

    async enterPrice(price: string) {
        await this.page.getByLabel('Limit Price').fill(price);
    }

    async enterQuantity(qty: string) {
        await this.page.getByLabel('Quantity').fill(qty);
    }

    valueInput(): Locator {
        return this.page.getByLabel('Value');
    }

    async clickBuy() {
        await this.page.getByRole('button', {name: 'Buy', exact: true}).click();
    }

    async clickSell() {
        await this.page.getByRole('button', {name: 'Sell', exact: true}).click();
    }

    priceError(): Locator {
        return this.page.getByTestId('price-error');
    }

    qtyError(): Locator {
        return this.page.getByTestId('qty-error');
    }

    actionError(): Locator {
        return this.page.getByTestId('action-error');
    }

    /* -------- Portfolio --------- */

    cashBalance(): Locator {
        return this.page.getByTestId('cash');
    }

    portfolio(): Locator {
        return this.page.getByTestId('portfolio-table');
    }
}
import type{Locator, Page} from "@playwright/test";
import { NavigationSection } from "./NavigationSection.js";

// Encapsulating the locators
export class StockTradingPage {
    readonly page: Page;
    readonly nav: NavigationSection;

    constructor(page: Page) {
        this.page = page;
        this.nav = new NavigationSection(page);
    }

    //playwright.config.ts file has the rest of the URL
    async goto() {
        await this.page.goto('index.html');
    }

    navigation(): NavigationSection {
        return this.nav;
    }

    /* -------- Left column --------- */

    ticker(ticker: string): Locator {
        return this.page
            .getByTestId('stock-list')
            .getByRole('listitem')
            .filter({hasText: ticker});
    }

    /* -------- Right column --------- */

    // Form for placing buy/sell orders
    currentPrice(): Locator {
        return this.page.getByTestId('stock-price');
    }

    limitPriceInput(): Locator {
        return this.page.getByLabel('Limit Price');
    }

    quantityInput(): Locator {
        return this.page.getByLabel('Quantity');
    }

    valueInput(): Locator {
        return this.page.getByLabel('Value');
    }

    buyButton(): Locator {
        return this.page.getByRole('button', {name: 'Buy', exact: true});
    }

    sellButton(): Locator {
        return this.page.getByRole('button', {name: 'Sell', exact: true});
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
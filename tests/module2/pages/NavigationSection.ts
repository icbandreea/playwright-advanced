import type { Locator, Page } from "@playwright/test";


export class NavigationSection {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    tradeLink(): Locator {
        return this.page.getByRole('link', {name: 'Trade'});
    }

    analyticsLink(): Locator {
        return this.page.getByRole('link', {name: 'Analytics'});
    }
}
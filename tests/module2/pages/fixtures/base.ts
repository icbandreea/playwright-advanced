import {test as base} from '@playwright/test';
import { StockTradingPage } from '../StockTradingPage.js';
import { AnalyticsPage } from '../AnalyticsPage.js';

export type PageFixtures = {
    stockPage: StockTradingPage,
    analyticsPage: AnalyticsPage
}

export const test = base.extend<PageFixtures>({
    stockPage: async ({page}, use) => {
        const stockPage = new StockTradingPage(page);

        await use(stockPage);
    },

    analyticsPage: async ({page}, use) => {
        const analyticsPage = new AnalyticsPage(page);

        await use(analyticsPage);
    }
        
});

// we should also export expect from this file because from now on we must refrence this file in all our tests so we can use both pages and assertions
// if you don't export the expect, then in our tests we would need to import the base file for the test function and also import the expect function from playwright
//this might be confusing and error prone to have 2 sources
export {expect} from '@playwright/test';
//this was initially a copy of base.ts file
import {test as base, expect} from '@playwright/test';
import { StockTradingPage } from '../StockTradingPage.js';
import { AnalyticsPage } from '../AnalyticsPage.js';
import { error } from 'node:console';

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
        
    },

        
});

// with this we extend the already extended test
// with this we inherit the custom pages and also add extra functionality that will only work in this strictTest
//no failOnJSError or extra features needed

export const strictTest = test.extend({
    page: async ({page}, use) => {
        // Monitor the console
        page.on("pageerror", (error) => {
            console.log(`Found an error: ${error.name}, ${error.message}`);
            expect.soft(error.name).not.toEqual("Error");
        });

        //Monitor the response
        page.on("response", (response) => {
            expect.soft(response.status(), 
                `Response with status ${response.status()} for URL: ${response.url()}`,
        ).toBeLessThan(300);
        });

        await use(page);
    }
});


export {expect} from '@playwright/test';


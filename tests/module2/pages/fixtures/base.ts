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

        // *
        console.log('do stuff before');
        await use(stockPage);
        console.log('do stuff after');
    },

    analyticsPage: async ({page}, use) => {
        const analyticsPage = new AnalyticsPage(page);
        
        await use(analyticsPage);
        
    },

    // override native fixtures
    page: async ({page}, use) => {

        console.log('inside the native page override - before');
        
        //here you can do whatever you want (run code before and after very test) , BUT, the mandatory line is the following:
        await use(page);

        console.log('inside the native page override - after');
        // **
    }
        
});



// we should also export expect from this file because from now on we must refrence this file in all our tests so we can use both pages and assertions
// if you don't export the expect, then in our tests we would need to import the base file for the test function and also import the expect function from playwright
//this might be confusing and error prone to have 2 sources
export {expect} from '@playwright/test';


// *
// so what we wanted to show with those console.logs is that the code before await use(stockPage) is ran before starting the test, then the test executes, and the code after use 
// is obviously executed after the test finishes executing
// this means that we can use this to add global hooks such as setup and teardown before every custom test that uses custom pages
// if you are going down the road of using custom page fixtures, then most (if not all) tests should use them to keep things consistent 
// but. if you do not want to use custom page fixtures, BUT want to add setup/ teardown, you can OVERRIDE native fixtures (page)


//**
// here it is worth mentioning the order of execution

// inside the native page override - before
// do stuff before
// inside the test
// do stuff after
// inside the native page override - after

// as we can see, first the program executes the code before the native page override hook, then the code before the custom fixture hook(that uses page), then 
// the code inside the test, then the code after the custom fixture hook, and then the code after the native page override hook
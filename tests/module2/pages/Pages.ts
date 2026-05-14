import type { Page } from "@playwright/test";
import { AnalyticsPage } from "./AnalyticsPage.js";
import { StockTradingPage } from "./StockTradingPage.js";


export class Pages {

    private stockPg?: StockTradingPage;
    private analyticsPg?: AnalyticsPage;

    constructor(private page: Page) {}

    // we defined a getter method for each 
    get stockPage() {
        return this.stockPg ??= new StockTradingPage(this.page); 
        // this means that if the page was never fetched, then create a new instance (new StockTradingPage(this.page))
        // but if it was fetched, then return the one that was originally initialized (this.stockPg)
    }

    get analyticsPage() {
        return this.analyticsPg ??= new AnalyticsPage(this.page);
    }
}
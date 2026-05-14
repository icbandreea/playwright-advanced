import type { Locator, Page } from "@playwright/test";
import { NavigationSection } from "./NavigationSection.js";

export class AnalyticsPage {
    readonly page: Page;
    readonly nav: NavigationSection;

    constructor(page: Page) {
        this.page = page;
        this.nav = new NavigationSection(page);
    }

    async goto() {
        await this.page.goto('analytics.html');
    }

    navigation(): NavigationSection {
        return this.nav;
    }

    analyticsMeesage(): Locator {
        return this.page.getByTestId('analytics-message');
    }

    cashBalance(): Locator {
        return this.page.getByTestId('cash');
    }
}
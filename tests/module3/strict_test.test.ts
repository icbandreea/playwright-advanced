import {test, strictTest} from "../module2/pages/fixtures/base2.js";

test.describe('two tests', () => {
    test("Test that focuses on core func", async({stockPage}) => {
        await stockPage.goto();
    });

    strictTest("Capture console errors and network", async({stockPage}) => {
        await stockPage.goto();
    });
})
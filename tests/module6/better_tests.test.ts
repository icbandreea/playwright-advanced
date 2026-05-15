import {test} from '@playwright/test';

/**
 * Best practices file-level tips
 * Title -> specify clearly what the test does - better context for humans and AI
 * if you have many conrtibutors to the code, then it will most certainly have inconsistent style. Best practice is to create a template
 * 
 * The template should be something like this: {most important aspect} - {expected action}
 * 
 * Buy one stock - cash and portfolio updated
 * Buy two stocks - cash and portfolio updated
 * 
 * Sell one stock - cash and portfolio updated
 * Sell all stocks - cash updated and portfolio empty
 * 
 * Sell stock not owned - rejected, cash and portfolio unchanged
 * Sell stock owned, but qty > owned qty - rejected, cash and portfolio unchanged
 * 
 * 
 * If you are testing offline behavior, then hoe much you buy is irrelevant, the offline part becomes the most important part, so you include that 
 * Buy stock when offline - rejected, cash and portfolio unchanged
 * 
 * If multiple tests could be grouped, you sould use test.describe() - the group title lets you add extra context that applies to all tests in that group + 
 * playwight plugin let's you run the entire group
 */


test("Buy one stock", async() => {

});

test("Buy two stock", async() => {

});

test("Sell one stock", async() => {

});

test("Sell two stocks", async() => {

});

test("Sell all stocks", async() => {

});


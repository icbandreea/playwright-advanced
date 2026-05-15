// When it comes to project level quick-tips:
// 1) organize your code - the bigger your codebase, the greater the benefit:
/**
 * Project structure
 * ===========================
 * 
 * test-data/ -                      data factories that generate random data, ready reusable objects, ready CSV or JSON files with test data
 * 
 * pages/ -                          POM (Page Object Model)
 *      sections/ -                  subfolder for page sections (footer, nav etc)
 *      fixtures/ -                  optional, but useful if you convert your pages into injectable fixtures
 *      types/ or domain_objects/ -  order, cart, item, patient order, etc
 * 
 * tests/ (inside use subfolders to group by domain, or user flow)
 *      trading/
 *      analytics/
 *      reporting/
 *      settings/
 *      deposit-withdrawal/
 *      login/
 *      Here comes another question: how to mark tests that we do for mobile, api, smoke, regression, strict - USE TAGS
 *      
 * 
 * utils/ -                          a place for reusable functions for rounding, formatting, file handling, date&time, authentication helpers, constants
 * 
 * .gitignore
 * package.json -           dependencies
 * playwright.config.js -   test run
 * tsconfig.js -            code rules
 */


import {test} from '@playwright/test';

test.describe('Group description', {tag: '@group-tag'}, () => {

});

test('Test 1', {tag: '@smoke'}, async() => {
    //then to run this use npx playwright test --grep "@smoke"
    // you can add several tags for the same test like this {tag: ['@smoke', '@login']}
});

//if you want to add even more metadata
test('Test 3', {
    annotation: {
        type: '',
        description: '' // use this carefully
    }
}, async () => {

});

// ALSO a very nice tip for when you use tags is to add commands to your scripts (package.json -> scripts block)
// "test": "npx playwright test", "smoke": "npx playwright test --grep @smoke", "codegen": "npx playwright codegen", "uimode": "npx playwright test --ui"
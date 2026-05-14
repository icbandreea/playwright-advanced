// In this file I am writing down the theory that is presented during the course

// Professional patterns and techniques
// for info visit: https://playwright.dev/docs/intro

// -----------------------------------------------------------------------------------------------------------------------------------------------

// POM
// Page Object Model (POM) is a design pattern that helps to create an object repository for web UI elements. 
// It enhances test maintenance and reduces code duplication by creating separate classes for each page of the application. 
// Each class contains methods that represent the actions that can be performed on that page, as well as locators for the elements on that page. 
// This way, if there are any changes in the UI, only the corresponding page class needs to be updated, rather than all the test cases that 
// interact with that page.

// -- 

//What POM Does
// POM helps you:

// Organize test code
// Reuse page interactions
// Reduce duplicated selectors
// Make tests easier to maintain
// Separate test logic from UI implementation

// Without POM, tests become messy very quickly.

// -- 

// Common POM Abstraction Levels
// Level 1 — Locator Wrapping
// Only locators are stored in page classes, while actions and assertions remain in tests.

// Level 2 — Locator + Action Wrapping
// Locators and user actions (click, fill, select, etc.) are wrapped into reusable methods.

// Level 3 — Full Abstraction
// Locators, actions, and assertions are all encapsulated inside page objects.

// Different teams and frameworks use different POM styles depending on project complexity and preferences. 
// There is no single “correct” implementation, which is why multiple POM variations exist in real-world automation frameworks.

// -----------------------------------------------------------------------------------------------------------------------------------------------



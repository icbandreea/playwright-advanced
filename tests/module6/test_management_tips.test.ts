// Tips regarding better test management

/**
 *  1) Avoid writing too many E2E tests 
 * Test Automation Pyramid: Lots of fast and stable Unit Tests, Many API tests, relatively few UI/ E2E tests
 * a very common setup is to have the developers write the unit tests, maybe API tests
 * and have the test automation engineers/ QA write the UI/ E2E test and then maybe some manual test scenarious (exploratory miscelanious) who can also produce scenarious 
 * that can be given to automation
 * Because in many cases testers do not look over the unit tests written by developers, and also developers do not have visibility over the E2E tests performed by QAs,
 * somehting not ok happens: flipped pyramid where developers skip testing and it is compensated by higher, slower, more expensive tests 
 * another possible outcome is called hourglass - in this case there is strong unit test coverage, but QA write a lot of higher level tests as well, 
 * this creates a large overlap (redundancy (repeated tests))
 * 
 * 2) Don't mandate 100% coverage
 * 
 * 3) Automation at wrong level: E2E tests are mostly for core flows: registration, authentication, core business actions, error recovery paths
 * the little details are best tested at lower levels
 * 
 * 
 */
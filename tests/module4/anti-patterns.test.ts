import { test, expect, type Page } from '@playwright/test';

test('...', async({page}) => {

    await test.step('Do things', async() => {
        //useless await
        const locator = page.getByTestId('some-id');

        //forgotten awaits
        //biome not catching these missing awaits
        page.goto('');
        page.getByTestId('some-id').click();

        //more actions
        //forgot await too
        await expect(page.getByRole('button')).toBeVisible();
    });
});

// This lesson has the focus of showing that there are tools that help us not forgetting to use await (in this case), or any other rules
// to do this, I installed Biome extesion and then in biome.json file I put under the linter block the following:
//"linter": {
	// 	"enabled": true,
	// 	"rules": {
	// 		"recommended": true,
	// 		"suspicious": {
	// 			"noAssignInExpressions": "off"
	// 		},
//* 		"nursery": {
	// 			"noPlaywrightMissingAwait": "error",
	// 			"noPlaywrightUselessAwait": "error"
//* 		}
	// 	}
	// },



//Avoid bad waiting
test('Poor waiting examples', async({page}) => {
    //adding "waits"
    // if you manually use timeout to wait a certain amount of time, most are redundant, wrong, or give false confidence

    //wait for the page to finish fetching resources - this looks good on the surface, but it is discouraged to use 
    await page.goto('...', {waitUntil: 'networkidle'});

    //click... do not use it for everything - click is enough
    // maybe a legitimate use case: if there is a page with lots of redirects and need to wait for a certain page to load: page1 -> page2 -> page3...
    await page.waitForURL('...');


    // the worst! this is an antipattern of any automation suite 
    page.waitForTimeout(100);
});


//Waiting for hydration
// what is hydration?
// the HTML is the first thing to load and it is fast: text, buttons, etc. They become visible and you can, strictly speaking, click/ interact with them, 
// but at the same time other resources are getting fetched: CSS styles, images, and JS files. These JS files may carry the functionality to make things happen 
// when you click around. If that is the case, JS files must load, then attach event listeners (attach interactivity - hydration), and only then do the 
// buttons and other things become truly functional. This last part is hydration. if your connection is reasonably fast you don't notice this gap between 
// first appearance and functionality. But if the connection is slow, or you use Playwright (which is super fast), you might start clicking before the functionality is 
// working. Because of this, you might think that the app is broken and the tests would fail
// IDEALLY, hydration should be fixed and not worked around - elements can be loaded disabled, and then enabled with the loaded JS
// but if that is not done, then you can still improve the reliability of the test by implementing a retry mechanism
// Playwright gives us expect().toPass() - in the most cases expect is used with one value (typically a locator), but it can also accept a callback function 
// which is the flaky block that we want to retry. But you probably do not want to retry too fast/ too much
// According to the documenation, the default rules are pretty sensible
// This approach is not the norm, poor hydration should be fixed and not worked around. But in exceptional cases, you can use this method

// Another retry mechanism is poll(). It takes a callback as the first argument and the second argument is an object with an optional flag, and then chain 
// the toBe() function at the end. This kind of polling is different in 2 ways. You are retrying for a single valu, typically from API/ DB


test('toPass and poll', async({page}) => {
    await expect(async () => {
        //problematic action + request
        await page.getByTestId('id1').click();
        await expect(page.getByTestId('id2')).toBeVisible();
    }).toPass(
        {
            //Probe, wait 1s, probe, wait 2s, probe, wait 10s, probe, wait 10s, probe
            //...Defaults to [100, 250, 500, 1000].
            intervals: [1000, 2000, 10000],
            timeout: 60000
        }
    );


    await expect.poll(async () => {

        //retry and return one value, typically from API/ DB - this has nothing to do with hydration or other FE problems 
        const response = await page.request.get('https://api.example.com');
        return response.status();
    }, {}).toBe(200);



});
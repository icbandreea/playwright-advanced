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
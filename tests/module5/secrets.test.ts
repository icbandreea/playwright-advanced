import {test} from '@playwright/test';

//he used the /config so that he doesn't have to add the dotenvx.config()



test('Secret from .env - BAD PRACTICE', async() => {

    // this is the biggest mistake, hardcoded confidential data visible everywhere
    const key = "your_secret_key";

    //use key
});

// the most accessible tool to manage confidential data is dotenv: npm install dotenv
// afterwards, at the root of the project create an .env file where you put your confidential data. VERY IMPORTANT put that file in .gitignore so it does not commit 
// then, in playwright.config.ts import dotenv from "dotenv"; and put dotenv.config(); (this is a one time thing that runs when playwright config loads)


test('Secret from .env - dotenv', async() => {

    //much better than hard-coded confidential data in code
    //still not a great choice
    console.log(`Key is: ${process.env.KEY}`);
});


//a better approach is to use dotenvx: npm install "@dotenvx/dotenvx"
// afterwards, in the terminal run npx dotenvx encrypt. after this, the .env file will become encrypted. besides the .env file, a new file has appeared .env.keys
// this contains the private key. this file would normally be moved to a local vault. but in this case we save it as an environment variable like this:
// setx DOTENV_PRIVATE_KEY "db354f93cde5356b07be2cce4cb2eee5afdc3682a5351c581ed05b5679ab829c" - it was saved in env variables on my computer (System properties -> env var)
//once that is done, delete the .env.keys file from the repository, it should never be commited
// then in playwright.config.ts import {config} from "@dotenvx/dotenvx"; and replace with: config();

test('Secret from .env - dotenvx', async() => {

    /**
     * 1) You commit confidential data, but it is encrypted + public key (useless without private key)
     * 2) Private key will be stored elsewhere
     *  */ 
    console.log(`Key is: ${process.env.X_KEY}`);
    // better approach, but not 100% bulletproof
    //does not protect against malware, stlen device (unlocked)
    
});


//AI knows your confidential data
test('AI confidential data example', async() => {
    /**
     * If you use AI to run or debug your code, especially while working with agents, beware. these tools can read confidential data
     * 1) 1st scenario: you ask AI to fix a failing test or debug, the agent reads your code, it notices a variable to inspect and adds a console.log() and that log prints 
     * the confidential data and reads the terminal output and now the AI tool sends that confidential data to OpenAI, Google etc - (as seen in the copilot history)
     * 
     */
    console.log(`X_KEY is: ${process.env.X_KEY}`);
});
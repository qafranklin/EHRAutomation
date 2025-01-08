const { chromium } = require('playwright'); // Use Playwright module
const fs = require('fs');
const path = require('path');

// LambdaTest credentials
const user = 'franklinbizbox';  // Replace with your LambdaTest username
const accessKey = 'MhF3hxXLRodl0LNUl2Wdbe9z19dYKUBajwwQN85nT2J3jHVGYb';  // Replace with your LambdaTest access key

// Function to dynamically require all test files in the 'tests' folder
const runTestsInDirectory = async (dir) => {
  // Get all .spec.js files in the tests folder
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.spec.js'));

  // Loop through each test file and run it
  for (const file of files) {
    const testFilePath = path.join(dir, file);
    console.log(`Running test file: ${testFilePath}`);

    try {
      const browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?user=${user}&accessKey=${accessKey}`,
        capabilities: {
          browserName: 'chrome', // Use browser of your choice: 'chrome', 'firefox', 'webkit'
          browserVersion: 'latest',  // Version of the browser
          platform: 'Windows 10',  // Platform for testing, e.g., 'Windows 10', 'macOS'
          build: 'LambdaTest Playwright Build',
          name: `Playwright Test - ${file}`,
        }
      });

      const page = await browser.newPage();
      await page.goto('https://www.lambdatest.com');  // Adjust to your test scenario

      // Running test logic here, for example:
      const title = await page.title();
      console.log(`Page title of ${testFilePath}: ${title}`);

      await browser.close();  // Close the browser after test
    } catch (error) {
      console.error(`Error running the test: ${file}`, error);
    }
  }
};

// Specify the path to your test directory
const testDir = './tests';  // Replace with the correct path if needed

// Run tests from the 'tests' directory
runTestsInDirectory(testDir).catch(err => console.error('Error running tests:', err));

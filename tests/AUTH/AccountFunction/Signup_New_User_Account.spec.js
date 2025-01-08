const { test, expect } = require('@playwright/test');

// Helper function to generate random first and last names
function generateRandomName() {
  const firstNames = ['John', 'Alice', 'David', 'Emma', 'Michael', 'Sophia', 'James'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Thomas', 'Jackson'];

  // Randomly select first and last names from the lists
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return { firstName, lastName };
}

// Helper function to validate and fill form fields
async function validateAndFill(page, locator, value, fieldName) {
  const field = await page.locator(locator);
  await expect(field).toBeVisible();
  await expect(field).toBeEnabled();
  const isRequired = await field.getAttribute('data-ng-required') || await field.getAttribute('ng-required');
  await expect(isRequired).toBeTruthy(); // Ensure the field is required
  console.log(`Filling up ${fieldName}: ${value}`);
  await field.fill(value);
}

test('@loginreg Signup New Account', async ({ page }) => {
  // Generate random first and last name
  const { firstName, lastName } = generateRandomName();

  // Generate dynamic values based on the random names
  const emailAddress = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@mailinator.com`;
  const credUsername = `${lastName.toLowerCase()}user`;

  // Step 1: Navigate Page
  await page.goto('http://v9-dev.southeastasia.cloudapp.azure.com:8083/app/index/index.html#/login');
  await expect(page).toHaveTitle('One Login');
  await expect(page).toHaveURL('http://v9-dev.southeastasia.cloudapp.azure.com:8083/app/index/index.html#/login');
  console.log('Login page validated.');

  // Step 2: Click the Sign Up Link
  const signUpLink = await page.locator('#createanaccount-lnk');
  await expect(signUpLink).toBeVisible();
  await signUpLink.click();
  console.log('Navigated to the sign-up page.');

  // Step 3: Verify the sign-up page
  await expect(page.locator('h3')).toHaveText('Create an Account');
  await expect(page).toHaveURL('http://v9-dev.southeastasia.cloudapp.azure.com:8083/app/index/index.html#/sign-up');

  // Step 4: Ensure Sign-Up button is disabled initially
  await expect(page.locator('#signUpFormSubmitButton')).toBeDisabled();
  console.log('Sign Up button is initially disabled.');

  // Step 5: Fill in the form fields
  await validateAndFill(page, '#lastName', lastName, 'Last Name');
  await validateAndFill(page, '#firstName', firstName, 'First Name');
  await validateAndFill(page, '#phoneNumber', '09283788063', 'Phone Number');
  await validateAndFill(page, '#emailAddress', emailAddress, 'Email Address');
  await validateAndFill(page, '#credusername', credUsername, 'Username');
  await validateAndFill(page, '#credpass', 'abcdE@123', 'Password');
  await validateAndFill(page, '#confirmPass', 'abcdE@123', 'Confirm Password');

  // Step 6: Select Secret Question
  const secretQuestionDropdown = await page.locator("#txtSecretQuestion");
  await expect(secretQuestionDropdown).toBeVisible();
  console.log('Available Secret Questions:', await secretQuestionDropdown.locator('option').allTextContents());
  await secretQuestionDropdown.selectOption({ label: 'What high school did you attend?' });
  console.log('Selected secret question: What high school did you attend?');

  // Step 7: Fill in the answer for secret question
  await validateAndFill(page, '#answer', 'Test Highschool', 'Answer to Secret Question');

  // Step 8: Ensure Sign-Up button is visible and enabled after filling required fields
  const signUpBtn = await page.locator('#signUpFormSubmitButton');
  await expect(signUpBtn).toBeVisible();
  await expect(signUpBtn).toBeEnabled();
  console.log('Sign Up button is now enabled, submitting form.');
  
  await signUpBtn.click();

  // Close the page
  await page.close();
});

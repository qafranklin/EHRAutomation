const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageobjects/LoginPage');

// Constants for repeated selectors
const PATIENT_TRIAGE_SELECTOR = "a[id='/patient-triage']";
const PATIENT_TRIAGE_PAGE_URL = 'http://localhost:84/app/user/user.html#/patient-triage';
const ADD_EDIT_PATIENT_FORM_SELECTOR = "form[name='addEditProvisionPatient']";

test('@Smoke Updating of Provision Patient', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Step 1: Navigate to the login page and validate title and URL
  await loginPage.navigateToLoginPage();
  await loginPage.validateLoginPage();

  // Step 2: Validate and fill login credentials
  await loginPage.validateUsernameField();
  await loginPage.fillUsername('nursecervantes');
  await loginPage.validatePasswordField();
  await loginPage.fillPassword('abcdE@123');

  // Step 3: Validate login button and perform login
  await loginPage.validateLoginButton();
  await loginPage.clickLoginButton();

  // Wait for the page to load completely
  await page.waitForLoadState('networkidle');

  // Step 4: Validate the home page after login
  await loginPage.validateHomePage();

  // Step 5: Validate the logged-in user is correct
  await loginPage.validateLoggedInUser('Antonia  Cervantes');

  // Step 6: Validate Patient Triage module is visible and access it
  const patientTriage = await page.locator(PATIENT_TRIAGE_SELECTOR);
  await expect(patientTriage).toBeVisible();
  await patientTriage.click();
  console.log('Patient Triage Module is visible: Passed');

  // Step 7: Validate landing page after clicking Patient Triage module
  await expect(page.locator('h2')).toHaveText('Patient Triage');
  await expect(page).toHaveURL(PATIENT_TRIAGE_PAGE_URL);
  console.log('Patient Triage Page is validated: Passed');

  // Step 8: Open the Update Patient form
  const triageBtn = await page.locator("[class='btn dropdown-toggle']");
  await triageBtn.first().click();
  await page.waitForTimeout(2000); // Ideally, use a better wait strategy here

  const updatePatientBtn = await page.locator('#provpat-edit-00');
  await expect(updatePatientBtn).toBeVisible();
  await updatePatientBtn.click();
  console.log('Update Patient button clicked: Passed');

  // Step 9: Validate the form for updating the patient
  const addEditForm = await page.locator(ADD_EDIT_PATIENT_FORM_SELECTOR);
  await expect(addEditForm).toBeVisible();
  console.log('Add/Edit Patient Form is visible:', await addEditForm.locator('h4').textContent());
//Step 10: 
const dropdown = await page.locator("select[title='Gender']"); // Use the appropriate selector
await dropdown.selectOption('Female')
//Check If The Selected Value is Correct
expect(dropdown).toHaveValue("string:Female")

// Assert that the dropdown contains a specific option by text




  // Optional: Add further interactions or assertions with the form
  // For example: fill out form fields and submit it.

});

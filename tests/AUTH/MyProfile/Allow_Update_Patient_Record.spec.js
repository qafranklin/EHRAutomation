const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pageobjects/LoginPage');

test('Allow Clinic Admin Update Records ', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const myprofileselectors = {
        updatepxrecords: page.locator('#userProfileAllowAdminToUpdatePatientRecords'),
        updatelabel: page.locator("[for*='userProfileAllowAdminToUpdatePatientRecords']"),
        disclaimer: page.locator('#yes-no-modal'),
        remarks: page.locator('#remarks'),
        yesbtn: page.locator('#yes-btn'),
        nobtn: page.locator('#no-btn'),
        closebtn: page.locator("[class*='close fastclickable']"),
        savetoaster: page.locator('.toast-message'),
        unsavetoaster: page.locator('.toast toast-error')
    }


 try {
  // Step 1: Navigate to the login page and validate title and URL
  await loginPage.navigateToLoginPage();
  await loginPage.validateLoginPage();
  // Step 2: Validate and fill login credentials
  await loginPage.validateUsernameField();
  await loginPage.fillUsername();
  await loginPage.validatePasswordField();
  await loginPage.fillPassword();
  // Step 3: Validate login button and perform login
  await loginPage.validateLoginButton();
  await loginPage.clickLoginButton();
  // Step 4: Wait for login and navigate to the profile page
  const isuserpic = await page.locator('#userPic');
  await expect(isuserpic).toBeVisible();
  await isuserpic.click();
  // Verify Profile Page URL and My Profile label
  await expect(page).toHaveURL('https://bizboxw22s:8083/app/main/main.html#/profile-management');
  const ismyprofilelbl = page.locator('#lblMyProfile');
  await expect(ismyprofilelbl).toBeVisible();
  await expect(ismyprofilelbl).toHaveText('My Profile');
  
  //Verify and Check Allow Clinic Admin Update Patient Records
  await expect(myprofileselectors.updatepxrecords).toBeVisible();
  await expect(myprofileselectors.updatepxrecords).toBeEnabled();
  await expect(myprofileselectors.updatelabel).toHaveText('Allow Clinic Admin to Update Patient Records');
  await myprofileselectors.updatepxrecords.check();
  //verify Disclaimer Modal 
  await expect(myprofileselectors.disclaimer).toBeVisible();
  //Verify if Remarks is Visible then fill up 
  await expect(myprofileselectors.remarks).toBeVisible();
  await expect(myprofileselectors.remarks).toBeEnabled();
  await myprofileselectors.remarks.fill('CONFIRM')
   //Verify if close Button is visible 
   await expect(myprofileselectors.closebtn).toBeVisible();
  await expect(myprofileselectors.closebtn).toBeEnabled();
  //Verify if Yes Button is visible 
  await expect(myprofileselectors.nobtn).toBeVisible();
  await expect(myprofileselectors.nobtn).toBeEnabled();
  //verify if No Button is Visible then click
  await expect(myprofileselectors.yesbtn).toBeVisible()
  await expect(myprofileselectors.yesbtn).toBeEnabled();
  await myprofileselectors.yesbtn.click();
  //verify Confirmation Toaster 
 await expect(myprofileselectors.savetoaster).toBeVisible();
 await expect(myprofileselectors.savetoaster).toContainText('Successfully Saved');
 //verify if Allow Clinic Admin Update patient records is allow 
 await expect(myprofileselectors.updatepxrecords).toBeChecked();


} catch (error) {
    console.error('An error occurred:', error);
    // Optional: Take a screenshot for debugging
    await page.screenshot({ path: 'screenshot.png' });
    // You can even rethrow the error if you want to stop the test execution
    throw error;
  }
});
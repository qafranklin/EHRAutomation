const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pageobjects/LoginPage');

test('Enable Telemed User ', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const telemedselectors = {
        istelemeduser: page.locator('#userIsTeleMedUser'),
        istelemedlabel: page.locator("[for*='userIsTeleMedUser']"),
        savetoaster: page.locator('.toast-success')
      
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
  const isuserpic = page.locator('#userPic');
  await expect(isuserpic).toBeVisible();
  await isuserpic.click();
  // Verify Profile Page URL and My Profile label
  await expect(page).toHaveURL('https://bizboxw22s:8083/app/main/main.html#/profile-management');
  const ismyprofilelbl = page.locator('#lblMyProfile');
  await expect(ismyprofilelbl).toBeVisible();
  await expect(ismyprofilelbl).toHaveText('My Profile');
  //Verify and Check Allow Clinic Admin Update Patient Records
  await expect(telemedselectors.istelemeduser).toBeVisible();
  await expect(telemedselectors.istelemeduser).toBeEnabled();
  await expect(telemedselectors.istelemedlabel).toHaveText('TeleMed User NOTE: *** This setup will identify if the user is using TeleMed consultation.');
  await telemedselectors.istelemeduser.check();
  //verify Confirmation Toaster 
 await expect(telemedselectors.savetoaster).toBeVisible();
 await expect(telemedselectors.savetoaster).toContainText('Successfully Saved');

 //verify if Telemed is enable
 await expect(telemedselectors.istelemeduser).toBeChecked();


} catch (error) {
    console.error('An error occurred:', error);
    // Optional: Take a screenshot for debugging
    await page.screenshot({ path: 'screenshot.png' });
    // You can even rethrow the error if you want to stop the test execution
    throw error;
  }
});
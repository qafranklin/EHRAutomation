const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pageobjects/LoginPage');

test('Add Digital Signature ', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const Ischangeprofile = {
        istelemeduser: page.locator('#userIsTeleMedUser'),
        istelemedlabel: page.locator("[for*='userIsTeleMedUser']"),
        uploadimage: page.locator('#digitalSigUploadIconInverse'),
        uploadtoaster: page.locator('.toast-message'),
        fileinput: page.locator("input[type='file']"),
        uploadbtn: page.locator('#btnUploadPhoto'),
        uploadcancel: page.locator('#btnCancel'),
        Uploadprescription: page.locator('#upload-digital-signature-modal')
      
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

  //Verify upload Image button then click
  await expect(Ischangeprofile.uploadimage).toBeVisible();
  await expect(Ischangeprofile.uploadimage).toBeEnabled();
  await Ischangeprofile.uploadimage.click();
  
  //Verify Upload Photo Modal if display
  await expect(Ischangeprofile.Uploadprescription).toBeVisible();
  await expect(Ischangeprofile.uploadbtn).toBeVisible();
  await expect(Ischangeprofile.uploadcancel).toBeVisible();
  await expect(Ischangeprofile.fileinput).toBeVisible
  //Upload Image File
  const filePath = 'C:\\Users\\BIZBOX\\Desktop\\MPH GIF\\docsig.png';  // Corrected file path for Windows
  await Ischangeprofile.fileinput.setInputFiles(filePath);
  //Click Upload 
  await Ischangeprofile.uploadbtn.click(); 
  //Verify upload Message Toaster 
  await expect(Ischangeprofile.uploadtoaster).toBeVisible();
 await expect(Ischangeprofile.uploadtoaster).toContainText('Digital signature successfully uploaded.');
  
} catch (error) {
    console.error('An error occurred:', error);
    // Optional: Take a screenshot for debugging
    await page.screenshot({ path: 'screenshot.png' });
    // You can even rethrow the error if you want to stop the test execution
    throw error;
  }
});
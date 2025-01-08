const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pageobjects/LoginPage');

// Utility function for common assertions
async function assertElement({ locator, visible = true, enabled = true, value = null }) {
  if (visible) {
    await expect(locator).toBeVisible();
  }
  if (enabled !== null) {
    if (enabled) {
      await expect(locator).toBeEnabled();
    } else {
      await expect(locator).toBeDisabled();
    }
  }
  if (value !== null) {
    await expect(locator).toHaveValue(value);
  }
}

test('Edit Profile', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Profile selectors
  const profileselectors = {
    editprofile: page.locator('#lnkEditProfile'),
    referenceid: page.locator('#txtReferenceId'),
    Externalid: page.locator('#txtExternalId'),
    Prefix: page.locator('#txtPrefix'),
    Firstname: page.locator('#txtFirstName'),
    Middlename: page.locator('#txtMiddleName'),
    Lastname: page.locator('#txtLastName'),
    Suffix: page.locator('#txtSuffix'),
    Custome: page.locator('#txtlblCustomName'),
    Phonenumber: page.locator('#txtPhoneNumber'),
    CivilStatus: page.locator('#txtCivilStatus'),
    bdaygreetings: page.locator('#hideBday'),
    gender: page.locator('#txtGender'),
    username: page.locator('#txtUserName'),
    email: page.locator('#txtEmail'),
    specialization: page.locator('#txtSpecializationPosition'),
    phicno: page.locator('#txtPhicNo'),
    licno: page.locator('#txtLicNo'),
    tinno: page.locator('#txtTin'),
    ptrno: page.locator('#txtPtrNo'),
    s2no: page.locator('#txtS2No'),
    primarydept: page.locator('#txtPrimaryDoctor'),
    savebtn: page.locator('#btnSave'),
    cancelbtn: page.locator('#btnCancel'),
    savetoaster: page.locator('.toast-success')

  };

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
  //Verify Edit profile button then click
  await assertElement({ locator: profileselectors.editprofile, visible: true, enabled: true });
  await profileselectors.editprofile.click();
  // Step 6: Verify Edit Profile Page is visible
  await expect(page.locator('#edit-profile')).toBeVisible();
  // Step 7: Verify fields are visible, enabled/disabled as appropriate
  await assertElement({ locator: profileselectors.referenceid, visible: true, enabled: false });
  await assertElement({ locator: profileselectors.Externalid, visible: true, enabled: false });
  await assertElement({ locator: profileselectors.Prefix, visible: true, enabled: true });
  await assertElement({ locator: profileselectors.Firstname, visible: true, enabled: true, value: 'Han' });
  await assertElement({ locator: profileselectors.Lastname, visible: true, enabled: true, value: 'Montenegro' });
  await assertElement({ locator: profileselectors.Middlename, visible: true, enabled: true });
  await assertElement({ locator: profileselectors.Suffix, visible: true, enabled: true });
  await assertElement({ locator: profileselectors.Custome, visible: true, enabled: true });
  await assertElement({ locator: profileselectors.Phonenumber, visible: true, enabled: true });
  await assertElement({ locator: profileselectors.CivilStatus, visible: true, enabled: true });
  await assertElement({ locator: profileselectors.username, visible: true, enabled: true, value: 'doctorhan' });
  await assertElement({ locator: profileselectors.email, visible: true, enabled: true });
  await assertElement({ locator: profileselectors.specialization, visible: true, enabled: true });
  await assertElement({ locator: profileselectors.phicno, visible: true, enabled: true });
  await assertElement({ locator: profileselectors.licno, visible: true, enabled: true });
  await assertElement({ locator: profileselectors.tinno, visible: true, enabled: true });
  await assertElement({ locator: profileselectors.ptrno, visible: true, enabled: true });
  await assertElement({ locator: profileselectors.s2no, visible: true, enabled: true });
  await assertElement({ locator: profileselectors.primarydept, visible: true, enabled: true });
  await assertElement({ locator: profileselectors.cancelbtn, visible: true, enabled: true });
   // Fill custom name and verify the value
   await profileselectors.Custome.fill('Han  Montenegro doctor');
   await assertElement({ locator: profileselectors.Custome, visible: true, enabled: true, value: 'Han  Montenegro doctor' });
  //verify Save Button then Click 
  await assertElement({ locator: profileselectors.savebtn, visible: true, enabled: true });
  await profileselectors.savebtn.click();

  //Vaerify Saving Toaster is display
  await expect(profileselectors.savetoaster).toHaveText('Successfully Updated!')
  
  //Verify if Edit profile is accesible
  await assertElement({ locator: profileselectors.editprofile, visible: true, enabled: true });
  await profileselectors.editprofile.click();
  //Verify if Edit porfile modal will display after click edit button 
  await expect(page.locator('#edit-profile')).toBeVisible();
  //Verify if the Changes is save 
  await assertElement({ locator: profileselectors.Custome, visible: true, enabled: true, value: 'Han  Montenegro doctor' });
  //Page will close
  await page.close();
  
});

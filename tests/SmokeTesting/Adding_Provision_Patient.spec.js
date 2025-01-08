// LoginTest.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageobjects/LoginPage');  // Correct path based on your file structure
const exp = require('constants');



function generateRandomName() {
  const firstNames = ['John', 'Alice', 'David', 'Emma', 'Michael', 'Sophia', 'James'];
  const lastNames = ['Dela Cruz', 'Perez', 'Villegez', 'Cruz', 'Anderson', 'Thomas', 'Jackson'];
  const middlenames = ['A','B','C','D'];

  // Randomly select first and last names from the lists
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const middleName = middlenames[Math.floor(Math.random()* middlenames.length)];

  return { firstName, lastName,middleName };
}

test('@Smoke Provision Patient Registration', async ({ page }) => {

  // Generate random first and last name
  const { firstName, lastName,middleName }  = generateRandomName();


  // Instantiate the LoginPage class
  const loginPage = new LoginPage(page);

  // Step 1: Navigate to the login page
  await loginPage.navigateToLoginPage();

  // Step 2: Validate the login page title and URL
  await loginPage.validateLoginPage();

  // Step 3: Validate and fill the username field
  await loginPage.validateUsernameField();
  await loginPage.fillUsername('nursecervantes');

  // Step 4: Validate and fill the password field
  await loginPage.validatePasswordField();
  await loginPage.fillPassword('abcdE@123');

  // Step 5: Validate the login button and click it
  await loginPage.validateLoginButton();
  await loginPage.clickLoginButton();

  await page.waitForLoadState('networkidle');
  // Step 6: Validate the home page after login
  await loginPage.validateHomePage();

  // Step 7: Validate the logged-in user
  await loginPage.validateLoggedInUser('Antonia  Cervantes');
  
  //Step 8: Vaidate Patient Triage module then access 
  const isPatientTriage = await page.locator("a[id='/patient-triage']")

  expect(isPatientTriage).toBeVisible();
  await isPatientTriage.click()
  console.log('Verify Patient Triage is Visible: Passed')
 
  //Step 9: Validate Lnading page after Click Patient Traige Module
  await expect(page.locator('h2')).toHaveText(' Patient Triage');
  await expect(page).toHaveURL('http://localhost:84/app/user/user.html#/patient-triage')
  console.log('Validate Patient Traige  Page: Passed')
  
  //Step 10: Valdiate Add Provision Button then click 
  const isaddprovisionbtn = await page.locator('#btnAddProvi')

  expect(isaddprovisionbtn).toBeVisible();
  expect(isaddprovisionbtn).toBeEnabled();
  await isaddprovisionbtn.click();

  //Check If Modal of adding of provision patient is display
  expect(page.locator('div.modal-content')).toBeVisible();
  console.log('Verify if Add provsion patient modal')

    //Ensure That the Add button is Disable when there no selected ESI Classification
    await expect(page.locator('#btn-prov')).toBeDisabled();
    console.log('Verify if The Add Button is Disable')

  //Check if ESI Classification Dropwdown is Visible 
  const isEsiClass = page.locator("select[title='ESI Classification']")

  expect(isEsiClass).toBeVisible();
  await isEsiClass.click()
  const getesiclassification = await isEsiClass.textContent();
  console.log('Get ESI Classification:',getesiclassification);
  isEsiClass.selectOption('Acute/Urgent');
  console.log('Verify Esi Classification then Select "Acute/Urgent" ')

  //verify Alias Fields 
  const isAlais = await page.locator('#Alias-alias')
  expect(isAlais).toBeVisible();
  expect(isAlais).toBeEnabled();
  console.log('verify Alias Fields ')

  //Verify if Type of Registration is Accesible 
  const isTypeofReg = await page.locator("select[title='Type of Registration']")
  expect(isTypeofReg).toBeVisible();
  const getTypeofReg = await isTypeofReg.textContent();
  console.log('Get Type of Registration:',getTypeofReg)

  //Verify Firstname Fields then fill up 
  const isFirstname = await page.locator('#Firstname-firstname')

  expect(isFirstname).toBeVisible();
  await expect(isFirstname).toBeEnabled();
  await isFirstname.fill(firstName)
  await expect(isFirstname).toHaveValue(firstName);//Verify if the Input value is Correct 
  console.log('Verify Firstname Fields then fill up ')

  //Verify Middlename Fields then Fill up 
  const isMidllename = await page.locator('#Middlename-middlename')
  expect(isMidllename).toBeVisible();
  await expect(isMidllename).toBeEnabled();
  await isMidllename.fill(middleName);
  console.log('Verify Middlename Fields then fill up ')

  //Verify Lastname Fields then Fill up 
  const isLastname = await page.locator('#Lastname-lastname')
  expect(isLastname).toBeVisible();
  await expect(isLastname).toBeEnabled();
  await isLastname.fill(lastName);
  await expect(isLastname).toHaveValue(lastName);//Verify if the Input value is Correct 
  console.log('Verify Lastname Fields then fill up ')
  

  //Verify Gender Fields is Visible
  await expect(page.locator("select[title='Gender']")).toBeVisible();
  console.log(' //Verify Gender Fields is Visible')

  //Verify Civil Status is Visible
  await expect(page.locator("select[title='Civil Status']")).toBeVisible();
  console.log('Verify Civil Status is Visible')

  //verify Birthday is Visible
  await expect(page.locator("//input[@id='bday']")).toBeVisible();
  console.log('Verify Birthday is Visible')

  //verify ER Bed is Visible 
  await expect(page.locator("select[title='ER Beds']")).toBeVisible();
  console.log('Verify ER Beds is Visible')

  //Verify if Is Mass Casualty is Visible
  await expect(page.locator('#isMassCasualty')).toBeVisible();
  console.log('Verify Mass Casualty is Visible')

  //Verify if Dead on Arrival is Visible 
  await expect(page.locator('#isDeadOnArrival')).toBeVisible();
  console.log('Verify Dead on Arrival')

  //Verify Remarks is Visible then Fill Up 
  const isRemarks = await page.locator('#Remarks-remarks')
  expect(isRemarks).toBeVisible();
  await isRemarks.fill('For Provision Patient')
  console.log('Verify Remarks is Visible then Fill Up ')

  //Ensure That the Add button is Enable after selection of ESI Classification
  const isaddbtn = await page.locator('#btn-prov')
  await expect(isaddbtn).toBeEnabled();
  await isaddbtn.click();
    console.log('Verify if The Add Button is Enable')
    await page.waitForTimeout(3000);

  const fullName = `${lastName} ${firstName} ${middleName}`;

  // Assert that the text of the first row's second column contains the full name
  await expect(page.locator("td[data-title='Name']").first()).toHaveText(fullName);
  console.log('Patient Successfully Added ',fullName);
  
    
  // Optional: Close the page after the test is done
  //await page.close();
});

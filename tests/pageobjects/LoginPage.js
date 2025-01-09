// LoginPage.js
const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator("button[type='submit']");
    this.homePageUrl = 'http://v9-dev.southeastasia.cloudapp.azure.com:8084/app/user/user.html#/visits';
    this.welcomeText = page.locator('text=Electronic Health Records');
    this.userFullName = page.locator("span[ng-bind='vm.user.fullName']");
  }

  // Step 1: Navigate to the login page
  async navigateToLoginPage() {
    await this.page.goto('http://v9-dev.southeastasia.cloudapp.azure.com:8083/app/index/index.html#/login');
    console.log('Navigate to login page');
  }

  // Step 2: Validate the login page title and URL
  async validateLoginPage() {
    await expect(this.page).toHaveTitle('One Login');
    console.log('Validate Page title: Passed');
    await expect(this.page).toHaveURL('http://v9-dev.southeastasia.cloudapp.azure.com:8083/app/index/index.html#/login');
    console.log('Validate Page URL: Passed');
  }

  // Step 3: Validate that username field is visible and enabled
  async validateUsernameField() {
    await expect(this.usernameField).toBeVisible();
    await expect(this.usernameField).toBeEnabled();
    console.log('Validate Username Field: Passed');
  }

  // Step 4: Fill the username field
  async fillUsername() {
    await this.usernameField.fill('erza');
    console.log('Fill Username Field');
  }

  // Step 5: Validate that password field is visible and enabled
  async validatePasswordField() {
    await expect(this.passwordField).toBeVisible();
    await expect(this.passwordField).toBeEnabled();
    console.log('Validate Password Field: Passed');
  }

  // Step 6: Fill the password field
  async fillPassword() {
    await this.passwordField.fill('abcdE@123');
    console.log('Fill Password Field');
  }

  // Step 7: Validate that login button is visible
  async validateLoginButton() {
    await expect(this.loginButton).toBeVisible();
    console.log('Validate Login Button: Passed');
  }

  // Step 8: Click the login button to submit the form
  async clickLoginButton() {
    await this.loginButton.click();
    console.log('Submit Login');
  }
  
  // Step 9: Validate the home page after login
  async validateHomePage() {
    await expect(this.page).toHaveURL(this.homePageUrl);
    await expect(this.welcomeText).toBeVisible();
    console.log('Validate Landing Page: Passed');
  }

  async validateLoggedInUser(){
    await expect(this.userFullName).toHaveText('Erza  Scarlette')
  }

  
}

module.exports = LoginPage;

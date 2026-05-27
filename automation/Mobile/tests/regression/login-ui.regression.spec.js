const loginPage = require('../../pages/LoginPage');

describe('Mobile Regression - Login UI', () => {
  it('should display login inputs and action button', async () => {
    const email = await loginPage.findFirst(loginPage.emailInput, { timeout: 30000 });
    const password = await loginPage.findFirst(loginPage.passwordInput, { timeout: 30000 });
    const loginButton = await loginPage.findFirst(loginPage.loginButton, { timeout: 30000 });

    await expect(email).toBeDisplayed();
    await expect(password).toBeDisplayed();
    await expect(loginButton).toBeDisplayed();
  });
});

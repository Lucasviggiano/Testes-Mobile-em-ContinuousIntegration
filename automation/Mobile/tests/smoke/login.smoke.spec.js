const loginPage = require('../../pages/LoginPage');

describe('Mobile Smoke - Login', () => {
  it('should authenticate with valid credentials', async () => {
    if (!process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD) {
      throw new Error('TEST_USER_EMAIL and TEST_USER_PASSWORD must be configured for smoke login test.');
    }

    const credentials = {
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD
    };

    await loginPage.login(credentials);
    await loginPage.assertDashboardVisible();
  });
});

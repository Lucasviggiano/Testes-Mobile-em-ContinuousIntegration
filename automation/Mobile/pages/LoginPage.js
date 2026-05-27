const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  get emailInput() {
    return [
      '~input-email',
      '~email',
      'android=new UiSelector().resourceIdMatches(".*email.*")',
      'android=new UiSelector().className("android.widget.EditText").instance(0)'
    ];
  }

  get passwordInput() {
    return [
      '~input-password',
      '~password',
      'android=new UiSelector().resourceIdMatches(".*password.*")',
      'android=new UiSelector().className("android.widget.EditText").instance(1)'
    ];
  }

  get loginButton() {
    return [
      '~button-LOGIN',
      '~Login',
      'android=new UiSelector().textContains("LOGIN")',
      'android=new UiSelector().textContains("Login")'
    ];
  }

  get dashboardMarker() {
    return [
      '~Products',
      '~Browse',
      'android=new UiSelector().textContains("Products")',
      'android=new UiSelector().textContains("Browse")'
    ];
  }

  async login(credentials) {
    await this.type(this.emailInput, credentials.email);
    await this.type(this.passwordInput, credentials.password);
    await this.tap(this.loginButton);
  }

  async assertDashboardVisible() {
    const marker = await this.findFirst(this.dashboardMarker, { timeout: 30000 });
    await expect(marker).toBeDisplayed();
  }
}

module.exports = new LoginPage();

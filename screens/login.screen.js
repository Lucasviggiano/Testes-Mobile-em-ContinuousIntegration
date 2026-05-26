const BaseScreen = require('./base.screen');
const selectors = require('../selectors/android/login.selectors');

class LoginScreen extends BaseScreen {
  async open() {
    await this.openTab('login');
  }

  async login(email, password) {
    await this.type(selectors.emailInput, email);
    await this.type(selectors.passwordInput, password);
    await this.tap(selectors.loginButton);
  }

  async getSuccessMessage() {
    return this.getText(selectors.successModalMessage);
  }

  async closeSuccessModal() {
    await this.tap(selectors.successModalOkButton);
  }
}

module.exports = new LoginScreen();

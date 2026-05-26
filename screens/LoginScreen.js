const IOSBaseScreen = require('./IOSBaseScreen');

class LoginScreen extends IOSBaseScreen {
  get emailInput() {
    return [
      '~input-email',
      '~email',
      '~Email',
      '-ios predicate string:type == "XCUIElementTypeTextField" AND (name CONTAINS[c] "email" OR label CONTAINS[c] "email" OR value CONTAINS[c] "email")',
      '-ios class chain:**/XCUIElementTypeTextField[`name CONTAINS[c] "email" OR label CONTAINS[c] "email"`]'
    ];
  }

  get passwordInput() {
    return [
      '~input-password',
      '~password',
      '~Password',
      '-ios predicate string:type == "XCUIElementTypeSecureTextField" AND (name CONTAINS[c] "password" OR label CONTAINS[c] "password")',
      '-ios class chain:**/XCUIElementTypeSecureTextField[`name CONTAINS[c] "password" OR label CONTAINS[c] "password"`]'
    ];
  }

  get loginButton() {
    return [
      '~button-LOGIN',
      '~Login',
      '~LOGIN',
      '-ios predicate string:type == "XCUIElementTypeButton" AND (name == "Login" OR name == "LOGIN" OR label == "Login" OR label == "LOGIN")',
      '-ios class chain:**/XCUIElementTypeButton[`name CONTAINS[c] "login" OR label CONTAINS[c] "login"`]'
    ];
  }

  get postLoginHomeMarkers() {
    return [
      '~Browse',
      '~Home',
      '-ios predicate string:type == "XCUIElementTypeButton" AND (name CONTAINS[c] "browse" OR label CONTAINS[c] "browse" OR name CONTAINS[c] "home" OR label CONTAINS[c] "home")'
    ];
  }

  async login(email, password) {
    await this.type(this.emailInput, email);
    await this.type(this.passwordInput, password);
    await this.tap(this.loginButton);
  }

  async assertLoggedIn() {
    const isLoggedIn = await this.isAnyDisplayed(this.postLoginHomeMarkers, 15000);
    await expect(isLoggedIn).toBe(true);
  }
}

module.exports = new LoginScreen();

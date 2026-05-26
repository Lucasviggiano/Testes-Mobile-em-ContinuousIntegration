const navigationSelectors = require('../selectors/android/navigation.selectors');

class BaseScreen {
  async tap(elementSelector) {
    const element = await $(elementSelector);
    await element.waitForDisplayed({ timeout: 60000 });
    await element.click();
  }

  async type(elementSelector, value) {
    const element = await $(elementSelector);
    await element.waitForDisplayed({ timeout: 60000 });
    await element.setValue(value);
  }

  async getText(elementSelector) {
    const element = await $(elementSelector);
    await element.waitForDisplayed({ timeout: 60000 });
    return element.getText();
  }

  async openTab(tabName) {
    const selector = navigationSelectors.tabs[tabName];
    if (!selector) {
      throw new Error(`Tab invalida: ${tabName}`);
    }
    await this.tap(selector);
  }
}

module.exports = BaseScreen;

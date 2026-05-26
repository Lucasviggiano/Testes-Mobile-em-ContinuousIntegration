const IOSBaseScreen = require('./IOSBaseScreen');

class BrowseScreen extends IOSBaseScreen {
  get browseButton() {
    return [
      '~Browse',
      '-ios predicate string:type == "XCUIElementTypeButton" AND (name == "Browse" OR label == "Browse")',
      '-ios class chain:**/XCUIElementTypeButton[`name CONTAINS[c] "browse" OR label CONTAINS[c] "browse"`]'
    ];
  }

  get searchInput() {
    return [
      '~Search',
      '~search',
      '-ios predicate string:(type == "XCUIElementTypeSearchField" OR type == "XCUIElementTypeTextField") AND (name CONTAINS[c] "search" OR label CONTAINS[c] "search")'
    ];
  }

  async openBrowse() {
    await this.tap(this.browseButton);
  }

  async selectProduct(productName) {
    if (await this.isAnyDisplayed(this.searchInput, 2000)) {
      await this.type(this.searchInput, productName, 5000);
    }
    await this.tapByVisibleText(productName);
  }
}

module.exports = new BrowseScreen();

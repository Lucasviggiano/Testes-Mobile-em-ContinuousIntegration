const IOSBaseScreen = require('./IOSBaseScreen');

class ProductScreen extends IOSBaseScreen {
  get addToCartButton() {
    return [
      '~Add To Cart',
      '~ADD TO CART',
      '-ios predicate string:type == "XCUIElementTypeButton" AND (name CONTAINS[c] "add to cart" OR label CONTAINS[c] "add to cart")',
      '-ios class chain:**/XCUIElementTypeButton[`name CONTAINS[c] "cart" OR label CONTAINS[c] "cart"`]'
    ];
  }

  async assertProductName(productName) {
    const candidates = [
      `~${productName}`,
      `-ios predicate string:type == "XCUIElementTypeStaticText" AND (name == "${productName}" OR label == "${productName}" OR value == "${productName}")`,
      `-ios predicate string:type == "XCUIElementTypeStaticText" AND (name CONTAINS[c] "${productName}" OR label CONTAINS[c] "${productName}" OR value CONTAINS[c] "${productName}")`,
      `-ios class chain:**/XCUIElementTypeStaticText[\`name CONTAINS[c] "${productName}" OR label CONTAINS[c] "${productName}" OR value CONTAINS[c] "${productName}"\`]`
    ];
    const visibleName = await this.getVisibleText(candidates, 15000);
    await expect(visibleName).toContain(productName);
  }

  async addToCart() {
    await this.tap(this.addToCartButton);
  }
}

module.exports = new ProductScreen();

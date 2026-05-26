const IOSBaseScreen = require('./IOSBaseScreen');
const addressScreen = require('./AddressScreen');

class CartScreen extends IOSBaseScreen {
  get cartButton() {
    return [
      '~Cart',
      '-ios predicate string:type == "XCUIElementTypeButton" AND (name == "Cart" OR label == "Cart")',
      '-ios class chain:**/XCUIElementTypeButton[`name CONTAINS[c] "cart" OR label CONTAINS[c] "cart"`]'
    ];
  }

  get addNewAddressButton() {
    return [
      '~Add New Address',
      '~ADD NEW ADDRESS',
      '-ios predicate string:type == "XCUIElementTypeButton" AND (name CONTAINS[c] "add new address" OR label CONTAINS[c] "add new address")'
    ];
  }

  get selectAddressButton() {
    return [
      '~Select Address',
      '~SELECT ADDRESS',
      '-ios predicate string:type == "XCUIElementTypeButton" AND (name CONTAINS[c] "select address" OR label CONTAINS[c] "select address")'
    ];
  }

  get continueToPaymentButton() {
    return [
      '~Continue To Payment',
      '~CONTINUE TO PAYMENT',
      '-ios predicate string:type == "XCUIElementTypeButton" AND (name CONTAINS[c] "continue to payment" OR label CONTAINS[c] "continue to payment")'
    ];
  }

  async openCart() {
    await this.tap(this.cartButton);
  }

  async goToPayment(addressData) {
    await this.openCart();

    if (await this.isAnyDisplayed(this.continueToPaymentButton, 5000)) {
      await this.tap(this.continueToPaymentButton);
      return;
    }

    if (await this.isAnyDisplayed(this.addNewAddressButton, 5000)) {
      await this.tap(this.addNewAddressButton);
      await addressScreen.fillAddress(addressData);
      await addressScreen.saveAddress();
    }

    if (await this.isAnyDisplayed(this.selectAddressButton, 8000)) {
      await this.tap(this.selectAddressButton);
    }

    await this.tap(this.continueToPaymentButton, 15000);
  }
}

module.exports = new CartScreen();

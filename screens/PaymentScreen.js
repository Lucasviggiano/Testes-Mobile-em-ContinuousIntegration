const IOSBaseScreen = require('./IOSBaseScreen');

class PaymentScreen extends IOSBaseScreen {
  get cashOnDeliveryOption() {
    return [
      '~Cash on Delivery',
      '~CASH ON DELIVERY',
      '-ios predicate string:(type == "XCUIElementTypeButton" OR type == "XCUIElementTypeStaticText") AND (name CONTAINS[c] "cash on delivery" OR label CONTAINS[c] "cash on delivery")'
    ];
  }

  get checkoutButton() {
    return [
      '~Checkout',
      '~CHECKOUT',
      '-ios predicate string:type == "XCUIElementTypeButton" AND (name CONTAINS[c] "checkout" OR label CONTAINS[c] "checkout")'
    ];
  }

  get transactionSuccessMessage() {
    return [
      '~Transaction successful',
      '-ios predicate string:type == "XCUIElementTypeStaticText" AND (name CONTAINS[c] "transaction successful" OR label CONTAINS[c] "transaction successful" OR value CONTAINS[c] "transaction successful")'
    ];
  }

  async finishCheckout() {
    await this.tap(this.cashOnDeliveryOption, 15000);
    await this.tap(this.checkoutButton, 15000);
  }

  async assertOrderSuccess() {
    const successMessage = await this.getVisibleText(this.transactionSuccessMessage, 15000);
    await expect(successMessage.toLowerCase()).toContain('transaction successful');
  }
}

module.exports = new PaymentScreen();

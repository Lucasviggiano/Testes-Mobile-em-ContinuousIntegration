const IOSBaseScreen = require('./IOSBaseScreen');

class AddressScreen extends IOSBaseScreen {
  get nameInput() {
    return [
      '~Full Name* input field',
      '~name',
      '-ios predicate string:(type == "XCUIElementTypeTextField" OR type == "XCUIElementTypeTextView") AND (name CONTAINS[c] "name" OR label CONTAINS[c] "name")'
    ];
  }

  get mobileInput() {
    return [
      '~Mobile Number* input field',
      '~mobile',
      '-ios predicate string:type == "XCUIElementTypeTextField" AND (name CONTAINS[c] "mobile" OR label CONTAINS[c] "mobile" OR name CONTAINS[c] "phone" OR label CONTAINS[c] "phone")'
    ];
  }

  get addressInput() {
    return [
      '~Address Line* input field',
      '~address',
      '-ios predicate string:(type == "XCUIElementTypeTextField" OR type == "XCUIElementTypeTextView") AND (name CONTAINS[c] "address" OR label CONTAINS[c] "address")'
    ];
  }

  get cityInput() {
    return [
      '~City* input field',
      '~city',
      '-ios predicate string:type == "XCUIElementTypeTextField" AND (name CONTAINS[c] "city" OR label CONTAINS[c] "city")'
    ];
  }

  get stateInput() {
    return [
      '~State/Region input field',
      '~state',
      '-ios predicate string:type == "XCUIElementTypeTextField" AND (name CONTAINS[c] "state" OR label CONTAINS[c] "state" OR name CONTAINS[c] "region" OR label CONTAINS[c] "region")'
    ];
  }

  get zipCodeInput() {
    return [
      '~Zip Code* input field',
      '~zip',
      '-ios predicate string:type == "XCUIElementTypeTextField" AND (name CONTAINS[c] "zip" OR label CONTAINS[c] "zip" OR name CONTAINS[c] "postal" OR label CONTAINS[c] "postal")'
    ];
  }

  get saveButton() {
    return [
      '~Save Address',
      '~SAVE ADDRESS',
      '~Save',
      '-ios predicate string:type == "XCUIElementTypeButton" AND (name CONTAINS[c] "save" OR label CONTAINS[c] "save")'
    ];
  }

  async fillAddress(addressData) {
    await this.type(this.nameInput, addressData.name);
    await this.type(this.mobileInput, addressData.mobile);
    await this.type(this.addressInput, addressData.address);
    await this.type(this.cityInput, addressData.city);
    await this.type(this.stateInput, addressData.state);
    await this.type(this.zipCodeInput, addressData.zipCode);
  }

  async saveAddress() {
    await this.tap(this.saveButton);
  }
}

module.exports = new AddressScreen();

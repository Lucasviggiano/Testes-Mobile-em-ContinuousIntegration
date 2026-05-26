const loginScreen = require('../../screens/LoginScreen');
const browseScreen = require('../../screens/BrowseScreen');
const productScreen = require('../../screens/ProductScreen');
const cartScreen = require('../../screens/CartScreen');
const paymentScreen = require('../../screens/PaymentScreen');
const testData = require('../../helpers/testData');

describe('EBAC Store - iOS Checkout Flow', () => {
  it('deve realizar login, adicionar produto ao carrinho e concluir checkout com sucesso', async () => {
    await loginScreen.login(testData.email, testData.password);
    await loginScreen.assertLoggedIn();

    await browseScreen.openBrowse();
    await browseScreen.selectProduct(testData.productName);

    await productScreen.assertProductName(testData.productName);
    await productScreen.addToCart();

    await cartScreen.goToPayment(testData.address);
    await paymentScreen.finishCheckout();
    await paymentScreen.assertOrderSuccess();
  });
});

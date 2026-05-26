const loginScreen = require('../../screens/login.screen');

describe('Login - Native Demo App', () => {
  it('deve realizar login com sucesso', async () => {
    await loginScreen.open();
    await loginScreen.login('qa.mobile+login@teste.com', '12345678');

    await expect($(require('../../selectors/android/login.selectors').successModalMessage)).toBeDisplayed();
    await expect(await loginScreen.getSuccessMessage()).toContain('You are logged in!');

    await loginScreen.closeSuccessModal();
  });
});

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Validação de Login (com Page Object Model)', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo();
  });

  test('Deve realizar login com sucesso', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Deve exibir mensagem de erro ao inserir senha incorreta', async () => {
    await loginPage.login('standard_user', 'senha_errada');
    await loginPage.assertErrorMessage('Username and password do not match');
  });
});
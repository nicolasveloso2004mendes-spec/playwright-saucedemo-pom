import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Fluxo Completo de Compra E2E (Checkout)', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Realiza o login inicial
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Deve realizar o checkout e finalizar a compra com sucesso', async ({ page }) => {
    // 1. Adiciona o produto ao carrinho
    await inventoryPage.addFirstProductToCart();
    
    // 2. Vai até o carrinho e valida o item
    await inventoryPage.goToCart();
    await cartPage.assertItemInCart('Sauce Labs Backpack');

    // 3. Inicia o processo de checkout
    await cartPage.proceedToCheckout();

    // 4. Preenche os dados do comprador
    await checkoutPage.fillCheckoutInformation('Nicolas', 'Mendes', '07000-000');

    // 5. Finaliza a compra
    await checkoutPage.finishCheckout();

    // 6. Valida a mensagem de confirmação
    await checkoutPage.assertOrderComplete('Thank you for your order!');

    // Pausa para visualização final da tela de sucesso
    await page.waitForTimeout(3000);
  });
});
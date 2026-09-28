import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Validação do Carrinho de Compras e Navegação', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    // Pré-condição: Fazer login no sistema
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Deve adicionar produto e visualizar no carrinho com sucesso', async ({ page }) => {
    // 1. Adiciona o primeiro produto e verifica o contador do ícone
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.assertCartCount('1');

    // 2. Clica no ícone do carrinho para ir à página do carrinho
    await inventoryPage.goToCart();

    // 3. Valida se o item "Sauce Labs Backpack" está presente na lista
    await cartPage.assertItemInCart('Sauce Labs Backpack');

    // 4. Avança para a etapa de checkout
    await cartPage.proceedToCheckout();

    // Pausa adicional de 3 segundos no final para visualização da tela de checkout
    await page.waitForTimeout(3000);
  });
});
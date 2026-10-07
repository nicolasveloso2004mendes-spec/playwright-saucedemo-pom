import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Mapeia o botão de Checkout
    this.checkoutButton = page.locator('#checkout');
  }

  // Valida se o produto correto está visível no carrinho pelo nome exato
  async assertItemInCart(expectedItemName: string) {
    const cartItemName = this.page.locator('.inventory_item_name', { hasText: expectedItemName });
    await expect(cartItemName).toBeVisible();
  }

  // Clica no botão para ir para a tela de formulário do Checkout
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
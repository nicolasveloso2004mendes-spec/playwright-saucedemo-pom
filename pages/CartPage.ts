import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItemName: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Mapeia o título do produto dentro do carrinho
    this.cartItemName = page.locator('.inventory_item_name');
    // Mapeia o botão de Checkout
    this.checkoutButton = page.locator('#checkout');
  }

  // Valida se o produto correto está visível no carrinho
  async assertItemInCart(expectedItemName: string) {
    await expect(this.cartItemName).toHaveText(expectedItemName);
  }

  // Clica no botão para ir para a tela de formulário do Checkout
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
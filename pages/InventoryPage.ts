import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly firstProductAddButton: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    // Seleciona o primeiro botão "Add to cart" da lista de produtos
    this.firstProductAddButton = page.locator('.inventory_item').first().locator('button');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async addFirstProductToCart() {
    await this.firstProductAddButton.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async assertCartCount(expectedCount: string) {
    await expect(this.cartBadge).toHaveText(expectedCount);
  }
}
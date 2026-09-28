import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    // Mapeamento do formulário de entrega
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');

    // Mapeamento da tela de confirmação
    this.finishButton = page.locator('#finish');
    this.completeHeader = page.locator('.complete-header');
  }

  // Preenche as informações do comprador e avança
  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  // Clica no botão Finish para concluir o pedido
  async finishCheckout() {
    await this.finishButton.click();
  }

  // Valida se a mensagem final contem o texto esperado (tolerante a espaços)
  async assertOrderComplete(expectedMessage: string) {
    await expect(this.completeHeader).toContainText(expectedMessage);
  }
}
# 🎭 Playwright Automation Project (E2E & POM)

Este projeto consiste numa suíte de testes automatizados End-to-End (E2E) desenvolvida em **TypeScript** utilizando o **Playwright**, aplicando o padrão de arquitetura **Page Object Model (POM)**.

## 🚀 Tecnologias Utilizadas
- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- Node.js

## 📁 Estrutura do Projeto
```text
├── pages/
│   └── LoginPage.ts       # Mapeamento e ações da tela de login
├── tests/
│   └── login.spec.ts      # Cenários de teste de login (sucesso e erro)
├── playwright.config.ts   # Configurações globais do Playwright
└── package.json           # Dependências do projeto
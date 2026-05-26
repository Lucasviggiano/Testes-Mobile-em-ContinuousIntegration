# Automação Mobile Android e iOS - EBAC Store

## Sobre o projeto
Este projeto implementa automação mobile com WebdriverIO + Appium para Android e iOS, utilizando JavaScript, Mocha e Screen Object Pattern.

A suíte iOS cobre o fluxo de checkout completo do app **EBAC Store**, incluindo:
1. Login
2. Acesso ao Browse
3. Seleção de produto
4. Adição ao carrinho
5. Tratamento de endereço (existente ou novo)
6. Pagamento
7. Finalização de compra
8. Validação da mensagem de sucesso

## Tecnologias utilizadas
- JavaScript
- WebdriverIO
- Appium
- Appium XCUITest Driver
- Mocha
- expect-webdriverio
- Allure Reporter
- iOS Simulator

## Estrutura de pastas
```text
automacao-mobile/
├── app/
│   ├── android/
│   └── ios/
│       └── LojaEBAC-sim.app
├── configs/
│   ├── android.conf.js
│   ├── ios.conf.js
│   └── browserstack.ios.conf.js
├── helpers/
├── reports/
├── screens/
├── tests/
│   ├── login/
│   └── ios/
│       └── checkout.ios.spec.js
├── .github/workflows/
│   └── mobile-ios-device-farm.yml
└── package.json
```

## Pré-requisitos
- Node.js 18+ e npm
- Java JDK instalado
- Appium 3
- Xcode instalado
- iOS Simulator disponível (ex.: iPhone 15 / iOS 17+)
- App EBAC Store para iOS disponível em `app/ios/LojaEBAC-sim.app` (execução local)

## Instalação
```bash
npm install
```

## Execução local iOS
Executar toda a suíte iOS:
```bash
npm run test:ios
```

Executar apenas o cenário de checkout iOS:
```bash
npm run test:ios:checkout
```

## CI Mobile iOS (Device Farm)
### Branch utilizada
- `ci`

### Device Farm escolhida
- BrowserStack App Automate

### Configuração dedicada
- Arquivo: `configs/browserstack.ios.conf.js`
- A configuração local (`configs/ios.conf.js`) permanece ativa e não foi substituída.

### Workflow
- Arquivo: `.github/workflows/mobile-ios-device-farm.yml`
- Gatilhos:
1. `push` na branch `ci`
2. `pull_request` com destino à branch `ci`

### Secrets necessários no GitHub
Configure em `Settings > Secrets and variables > Actions`:
1. `BROWSERSTACK_USERNAME`
2. `BROWSERSTACK_ACCESS_KEY`
3. `BROWSERSTACK_APP_ID` (app já enviado ao BrowserStack, ex.: `bs://...`)
4. `IOS_DEVICE_NAME` (ex.: `iPhone 15`)
5. `IOS_PLATFORM_VERSION` (ex.: `17`)

### Comando de execução na Device Farm
O workflow executa:
```bash
npm run test:ios:devicefarm
```

Script equivalente direto:
```bash
npm run test:ios:browserstack
```

### Evidências e logs no GitHub Actions
Ao fim da execução, acesse a run em `Actions` e baixe o artifact:
- `ios-device-farm-evidences-<run_number>`

Conteúdo esperado:
1. `logs/wdio-browserstack.log`
2. `reports/allure-results/` (quando houver resultados)
3. `reports/allure-report/` (quando gerado)

### Gravação de vídeo da execução na Device Farm
1. Abra o dashboard do BrowserStack App Automate.
2. Localize a build com nome `GH-<run_number>-ci` (ou nome configurado na variável `BROWSERSTACK_BUILD_NAME`).
3. Abra a sessão do teste de checkout iOS.
4. Baixe ou compartilhe a gravação de vídeo da sessão para comprovação da execução.

## Relatório Allure (local)
```bash
npm run allure:generate
npm run allure:open
```

## Entrega técnica
Para apresentação técnica, informe:
1. Link do repositório
2. Nome da branch utilizada (`ci`)
3. Link da execução no GitHub Actions
4. Vídeo da execução no BrowserStack

# Automação Mobile Android e iOS - EBAC Store

## Sobre o projeto
Este projeto implementa automação mobile com WebdriverIO + Appium para Android e iOS, utilizando JavaScript, Mocha e Screen Object Pattern.

## Stack
- JavaScript
- WebdriverIO
- Appium
- Mocha
- expect-webdriverio
- Allure Reporter

## Estrutura principal
```text
automacao-mobile/
├── configs/
│   ├── android.conf.js
│   ├── ios.conf.js
│   ├── browserstack.android.conf.js
│   └── browserstack.ios.conf.js
├── tests/
│   ├── login/
│   └── ios/
├── .github/workflows/
│   ├── mobile-android-device-farm.yml
│   └── mobile-ios-device-farm.yml
└── package.json
```

## Execução local
Instalação:
```bash
npm install
```

iOS local:
```bash
npm run test:ios
npm run test:ios:checkout
```

Android local:
```bash
npm run test:android
```

## CI Mobile iOS (BrowserStack)
Branch:
- `ci`

Workflow:
- `.github/workflows/mobile-ios-device-farm.yml`

Scripts:
- `npm run test:ios:browserstack`
- `npm run test:ios:devicefarm`

Secrets:
1. `BROWSERSTACK_USERNAME`
2. `BROWSERSTACK_ACCESS_KEY`
3. `BROWSERSTACK_APP_ID` (app iOS já enviado ao BrowserStack: `bs://...`)
4. `IOS_DEVICE_NAME`
5. `IOS_PLATFORM_VERSION`

Evidências no GitHub Actions:
- artifact `ios-device-farm-evidences-<run_number>`
- `logs/wdio-browserstack.log`
- `reports/allure-results/`
- `reports/allure-report/`

Vídeo de execução:
1. Abrir BrowserStack App Automate.
2. Localizar a build `GH-<run_number>-ci`.
3. Abrir a sessão iOS e baixar/compartilhar o vídeo.

## CI Mobile Android (BrowserStack)
Branch:
- `ci`

Workflow:
- `.github/workflows/mobile-android-device-farm.yml`

Scripts:
- `npm run test:android:browserstack`
- `npm run test:android:devicefarm`

Secrets:
1. `BROWSERSTACK_USERNAME`
2. `BROWSERSTACK_ACCESS_KEY`
3. `BROWSERSTACK_ANDROID_APP_ID` (app Android enviado ao BrowserStack: `bs://...`)
4. `ANDROID_DEVICE_NAME`
5. `ANDROID_PLATFORM_VERSION`

Evidências no GitHub Actions:
- artifact `android-device-farm-evidences-<run_number>`
- `logs/wdio-android-browserstack.log`
- `reports/allure-results/`
- `reports/allure-report/`

Vídeo de execução:
1. Abrir BrowserStack App Automate.
2. Localizar a build `GH-<run_number>-ci`.
3. Abrir a sessão Android e baixar/compartilhar o vídeo.

## Relatório Allure (local)
```bash
npm run allure:generate
npm run allure:open
```

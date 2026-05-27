# Mobile Automation - Enterprise QA Blueprint

Professional mobile automation project using WebdriverIO + Appium + BrowserStack with CI/CD in GitHub Actions.

## Architecture principles
- Page Object Model with reusable abstractions
- Decoupled configuration per environment (local/cloud)
- Capabilities isolated from test logic
- Smoke and regression suites separated for release governance
- Cloud-first observability (Allure + logs + BrowserStack video/session)

## Folder structure
```text
automation/Mobile/
├── app/
│   └── android/
│       └── .gitkeep
├── configs/
│   ├── base.conf.js
│   ├── android.conf.js
│   └── browserstack.conf.js
├── pages/
│   ├── BasePage.js
│   └── LoginPage.js
├── reports/
│   ├── allure-results/
│   └── logs/
├── tests/
│   ├── smoke/
│   │   └── login.smoke.spec.js
│   └── regression/
│       └── login-ui.regression.spec.js
├── utils/
│   ├── browserstack.js
│   ├── capabilities.js
│   └── env.js
└── package.json
```

## Setup
### Prerequisites
- Node.js 20+
- npm 10+
- Appium 3 (for local execution)
- Android SDK and emulator/device (for local execution)
- BrowserStack account

### Install
```bash
cd automation/Mobile
npm install
```

## Environment variables
### Mandatory for cloud execution
- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`

### Required app reference (choose one strategy)
1. `BROWSERSTACK_ANDROID_APP_ID` (`bs://...`) in GitHub Secrets, or
2. APK file in `automation/Mobile/app/android/loja-ebac.apk`, or
3. `BROWSERSTACK_APP_PUBLIC_URL` as repository variable pointing to APK URL.

### Optional quality controls
- `BROWSERSTACK_DEVICE_NAME`
- `BROWSERSTACK_OS_VERSION`
- `BROWSERSTACK_PROJECT_NAME`
- `BROWSERSTACK_BUILD_NAME`
- `TEST_USER_EMAIL`
- `TEST_USER_PASSWORD`

## Local execution
Regression:
```bash
npm run test:regression:local
```

Smoke:
```bash
npm run test:smoke:local
```

## Cloud execution (BrowserStack)
Regression:
```bash
npm run test:regression:cloud
```

Smoke:
```bash
npm run test:smoke:cloud
```

## CI/CD execution
Workflow file:
- `.github/workflows/mobile-ci.yml`

Trigger:
- `push` in branch `ci`
- `pull_request` targeting branch `ci`
- manual dispatch

Pipeline stages:
1. Validate mandatory secrets
2. Install dependencies
3. Resolve BrowserStack app (secret/file/public URL)
4. Execute regression cloud suite
5. Execute smoke cloud suite (if credentials are configured)
6. Generate Allure report
7. Publish artifacts

## GitHub Secrets and Variables
### Secrets
- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`
- `BROWSERSTACK_ANDROID_APP_ID` (recommended)
- `TEST_USER_EMAIL` (optional)
- `TEST_USER_PASSWORD` (optional)

### Variables
- `BROWSERSTACK_DEVICE_NAME` (optional)
- `BROWSERSTACK_OS_VERSION` (optional)
- `BROWSERSTACK_APP_PUBLIC_URL` (optional)

## Logs, evidence and traceability
- BrowserStack video recording per session (dashboard)
- BrowserStack device/network logs (`bstack:options`)
- WDIO execution logs in `reports/logs/`
- Allure raw results in `reports/allure-results/`
- Allure report in `reports/allure-report/`
- GitHub artifact: `mobile-cloud-evidences-<run_number>`

## Stability strategy
- Selector fallback strategy in POM
- Strict timeout and retry controls in shared config
- Cloud session status update using BrowserStack executor
- Independent suites (smoke/regression) to isolate failures
- Credential and environment validation before execution

## Scalability strategy
- Parallel suites by increasing `BROWSERSTACK_MAX_INSTANCES`
- Capability matrix evolution via `utils/capabilities.js`
- Easy multi-environment extension with new conf files
- Ready for future Allure trend history integration
- Ready for future integration with API/Web layers in same QA platform

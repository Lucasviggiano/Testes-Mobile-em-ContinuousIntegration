# TCC-EBAC-QE - Mobile Quality Engineering Platform

Enterprise-oriented Quality Engineering solution for Android mobile automation with BrowserStack Device Farm and GitHub Actions CI/CD.

Reference baseline used for quality and structure standards:
- [EBAC-QE/ebac-qe](https://github.com/EBAC-QE/ebac-qe)

## Project structure
```text
TCC-EBAC-QE/
├── automation/
│   └── Mobile/
│       ├── configs/
│       │   ├── android.conf.js
│       │   └── browserstack.conf.js
│       ├── tests/
│       │   ├── smoke/
│       │   └── regression/
│       ├── pages/
│       ├── utils/
│       ├── reports/
│       ├── package.json
│       └── README.md
├── .github/
│   └── workflows/
│       └── mobile-ci.yml
├── docs/
│   └── mobile/
└── README.md
```

## Device Farm strategy
- Primary platform: BrowserStack App Automate
- Runtime: WebdriverIO + Appium UiAutomator2
- Cloud evidence:
1. BrowserStack session logs
2. BrowserStack video recording
3. Allure evidence
4. CI artifacts from GitHub Actions

## CI/CD strategy
Workflow:
- `.github/workflows/mobile-ci.yml`

Trigger policy:
1. `push` to `ci`
2. `pull_request` to `ci`
3. `workflow_dispatch`

Execution model:
1. Validate mandatory secrets
2. Resolve app identifier (`bs://...` from secret or upload step)
3. Execute regression cloud suite
4. Execute smoke cloud suite when test credentials exist
5. Publish Allure and logs as artifacts

## Mandatory GitHub secrets
1. `BROWSERSTACK_USERNAME`
2. `BROWSERSTACK_ACCESS_KEY`

Recommended additional secrets:
1. `BROWSERSTACK_ANDROID_APP_ID`
2. `TEST_USER_EMAIL`
3. `TEST_USER_PASSWORD`

Recommended GitHub variables:
1. `BROWSERSTACK_DEVICE_NAME`
2. `BROWSERSTACK_OS_VERSION`
3. `BROWSERSTACK_APP_PUBLIC_URL`

## Branch strategy
- `main`: stable baseline
- `ci`: integration branch for pipeline validation, cloud execution and QA release hardening

## Runbook
Detailed setup, commands and troubleshooting:
- [Mobile README](./automation/Mobile/README.md)
- [Architecture and CI/CD flow](./docs/mobile/architecture.md)

## Git commands (ci branch flow)
```bash
git checkout -b ci
git add .
git commit -m "ci: add mobile cloud execution pipeline"
git push origin ci
```

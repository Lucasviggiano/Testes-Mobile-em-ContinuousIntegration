const path = require('node:path');

const allureOutputDir = path.resolve(__dirname, '../reports/allure-results');

const requiredEnvVars = [
  'BROWSERSTACK_USERNAME',
  'BROWSERSTACK_ACCESS_KEY',
  'BROWSERSTACK_ANDROID_APP_ID'
];

const missingRequiredEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingRequiredEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables for BrowserStack Android execution: ${missingRequiredEnvVars.join(', ')}`
  );
}

exports.config = {
  runner: 'local',
  protocol: 'https',
  hostname: 'hub-cloud.browserstack.com',
  port: 443,
  path: '/wd/hub',
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  specs: ['./tests/login/**/*.spec.js'],
  maxInstances: 1,
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 30000,
  connectionRetryTimeout: 180000,
  connectionRetryCount: 2,
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: allureOutputDir,
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false
      }
    ]
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000
  },
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Samsung Galaxy S23',
      'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '13.0',
      'appium:app': process.env.BROWSERSTACK_ANDROID_APP_ID,
      'appium:noReset': false,
      'appium:newCommandTimeout': 240,
      'bstack:options': {
        projectName: process.env.BROWSERSTACK_PROJECT_NAME || 'EBAC Store Mobile Android',
        buildName:
          process.env.BROWSERSTACK_BUILD_NAME ||
          `ci-android-${process.env.GITHUB_RUN_NUMBER || 'local'}`
      }
    }
  ],
  services: []
};

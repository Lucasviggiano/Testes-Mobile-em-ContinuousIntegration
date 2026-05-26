const path = require('node:path');

const allureOutputDir = path.resolve(__dirname, '../reports/allure-results');

const requiredEnvVars = [
  'BROWSERSTACK_USERNAME',
  'BROWSERSTACK_ACCESS_KEY',
  'BROWSERSTACK_APP_ID'
];

const missingRequiredEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingRequiredEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables for BrowserStack execution: ${missingRequiredEnvVars.join(', ')}`
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
  specs: ['./tests/ios/**/*.spec.js'],
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
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 15',
      'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '17',
      'appium:app': process.env.BROWSERSTACK_APP_ID,
      'appium:noReset': false,
      'appium:newCommandTimeout': 240,
      'bstack:options': {
        projectName: process.env.BROWSERSTACK_PROJECT_NAME || 'EBAC Store Mobile iOS',
        buildName:
          process.env.BROWSERSTACK_BUILD_NAME ||
          `ci-ios-${process.env.GITHUB_RUN_NUMBER || 'local'}`
      }
    }
  ],
  services: []
};

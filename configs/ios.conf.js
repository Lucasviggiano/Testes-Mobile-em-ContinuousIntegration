const path = require('node:path');

const iosAppPath = path.resolve(__dirname, '../app/ios/LojaEBAC-sim.app');

exports.config = {
  runner: 'local',
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',
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
        outputDir: path.resolve(__dirname, '../reports/allure-results'),
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
      'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '17.5',
      'appium:app': process.env.IOS_APP_PATH || iosAppPath,
      'appium:noReset': false,
      'appium:newCommandTimeout': 240
    }
  ],
  services: []
};

const path = require('node:path');
const { markBrowserStackSessionStatus } = require('../utils/browserstack');

const reportsDir = path.resolve(__dirname, '../reports');

exports.baseConfig = {
  specs: ['./tests/**/*.spec.js'],
  suites: {
    smoke: ['./tests/smoke/**/*.spec.js'],
    regression: ['./tests/regression/**/*.spec.js']
  },
  maxInstances: Number(process.env.MAX_INSTANCES || 1),
  logLevel: process.env.WDIO_LOG_LEVEL || 'info',
  bail: 0,
  waitforTimeout: Number(process.env.WAITFOR_TIMEOUT || 20000),
  connectionRetryTimeout: Number(process.env.CONNECTION_RETRY_TIMEOUT || 120000),
  connectionRetryCount: Number(process.env.CONNECTION_RETRY_COUNT || 2),
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: Number(process.env.MOCHA_TIMEOUT || 120000)
  },
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: path.join(reportsDir, 'allure-results'),
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        addConsoleLogs: true
      }
    ]
  ],
  afterTest: async function afterTest(test, _context, { passed, error }) {
    await markBrowserStackSessionStatus({
      passed,
      testName: test.title,
      reason: error ? error.message : 'Assertion flow completed successfully'
    });
  }
};

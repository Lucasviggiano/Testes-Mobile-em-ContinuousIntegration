const { baseConfig } = require('./base.conf');
const { loadDotenv, requireEnvVars, getEnvValue } = require('../utils/env');
const { buildBrowserStackAndroidCapabilities } = require('../utils/capabilities');

loadDotenv();
requireEnvVars(['BROWSERSTACK_USERNAME', 'BROWSERSTACK_ACCESS_KEY', 'BROWSERSTACK_APP_ID']);

exports.config = {
  ...baseConfig,
  runner: 'local',
  protocol: 'https',
  hostname: 'hub-cloud.browserstack.com',
  port: 443,
  path: '/wd/hub',
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  capabilities: [buildBrowserStackAndroidCapabilities()],
  maxInstances: Number(getEnvValue('BROWSERSTACK_MAX_INSTANCES', '1'))
};

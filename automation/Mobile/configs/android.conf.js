const { baseConfig } = require('./base.conf');
const { loadDotenv, getEnvValue } = require('../utils/env');
const { buildLocalAndroidCapabilities } = require('../utils/capabilities');

loadDotenv();

exports.config = {
  ...baseConfig,
  runner: 'local',
  hostname: getEnvValue('APPIUM_HOST', '127.0.0.1'),
  port: Number(getEnvValue('APPIUM_PORT', '4723')),
  path: getEnvValue('APPIUM_PATH', '/'),
  capabilities: [buildLocalAndroidCapabilities()]
};

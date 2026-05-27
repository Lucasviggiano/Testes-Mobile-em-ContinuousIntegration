const path = require('node:path');
const { getEnvValue } = require('./env');

function buildLocalAndroidCapabilities() {
  const defaultAppPath = path.resolve(__dirname, '../app/android/loja-ebac.apk');

  return {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': getEnvValue('LOCAL_ANDROID_DEVICE_NAME', 'ANDROID_EMULATOR'),
    'appium:udid': getEnvValue('LOCAL_ANDROID_UDID', 'emulator-5554'),
    'appium:app': getEnvValue('ANDROID_APP_PATH', defaultAppPath),
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 240,
    'appium:noReset': false
  };
}

function buildBrowserStackAndroidCapabilities() {
  return {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:app': process.env.BROWSERSTACK_APP_ID,
    'bstack:options': {
      deviceName: getEnvValue('BROWSERSTACK_DEVICE_NAME', 'Samsung Galaxy S23'),
      osVersion: getEnvValue('BROWSERSTACK_OS_VERSION', '13.0'),
      projectName: getEnvValue('BROWSERSTACK_PROJECT_NAME', 'TCC EBAC QE Mobile'),
      buildName:
        getEnvValue('BROWSERSTACK_BUILD_NAME', '') ||
        `mobile-cloud-${process.env.GITHUB_RUN_NUMBER || 'local'}`,
      sessionName: getEnvValue('BROWSERSTACK_SESSION_NAME', 'Android smoke and regression'),
      debug: true,
      networkLogs: true,
      deviceLogs: true
    }
  };
}

module.exports = {
  buildLocalAndroidCapabilities,
  buildBrowserStackAndroidCapabilities
};

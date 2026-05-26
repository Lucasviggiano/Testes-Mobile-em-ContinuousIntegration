const path = require('node:path');

const apkPath = path.resolve(process.cwd(), 'app/android/wdio-native-demo.apk');

const androidCapabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'ANDROID_EMULATOR',
  'appium:udid': 'emulator-5554',
  'appium:app': apkPath,
  'appium:noReset': true,
  'appium:autoGrantPermissions': true,
  'appium:newCommandTimeout': 120,
  'appium:adbExecTimeout': 120000,
  'appium:androidInstallTimeout': 240000,
  'appium:uiautomator2ServerInstallTimeout': 120000
};

module.exports = {
  androidCapabilities
};

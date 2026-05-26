const { androidCapabilities } = require('./configs/android.conf');

exports.config = {
  runner: 'local',
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',
  specs: ['./tests/**/*.spec.js'],
  maxInstances: 1,
  capabilities: [androidCapabilities],
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 60000,
  connectionRetryTimeout: 300000,
  connectionRetryCount: 2,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  reporters: ['spec'],
  services: []
};

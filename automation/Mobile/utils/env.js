const path = require('node:path');
const dotenv = require('dotenv');

let isDotenvLoaded = false;

function loadDotenv() {
  if (isDotenvLoaded) {
    return;
  }

  dotenv.config({ path: path.resolve(__dirname, '../.env') });
  isDotenvLoaded = true;
}

function getEnvValue(name, fallback) {
  const value = process.env[name];
  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }
  return fallback;
}

function requireEnvVars(requiredVars) {
  const missingVars = requiredVars.filter((name) => {
    const value = process.env[name];
    return !(typeof value === 'string' && value.trim().length > 0);
  });

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

module.exports = {
  loadDotenv,
  getEnvValue,
  requireEnvVars
};

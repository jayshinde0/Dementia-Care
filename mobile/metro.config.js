const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Disable new architecture
config.resolver.unstable_enablePackageExports = false;

module.exports = config;

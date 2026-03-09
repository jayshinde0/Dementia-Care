const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Workaround for Windows path issue with node:sea
config.resolver = {
  ...config.resolver,
  blockList: [/node:sea/],
};

module.exports = config;

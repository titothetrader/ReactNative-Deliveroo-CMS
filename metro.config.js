const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

config.transformer.minifierConfig.compress.drop_console = true;
config.resolver.sourceExts = [...config.resolver.sourceExts, "mjs", "cjs"];
module.exports = config;
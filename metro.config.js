const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

// Explicitly restrict Metro to ONLY watch this project's directory.
// Without this, Metro crawls up to the nearest Git root (/LiveTV),
// then tries to watch both node_modules folders (tedeytv + livetv-native),
// causing the EMFILE: too many open files crash.
config.watchFolders = [projectRoot];

// Exclude node_modules from the nested sibling projects
config.resolver.blockList = [
  // Block the sibling Next.js project entirely
  new RegExp(`${path.resolve(__dirname, '../tedeytv')}/.*`),
];

module.exports = config;

const _ = require('lodash');
const env = process.env.NODE_ENV || 'development';
const defaultConfig = require('./default.json');
const envConfig = require('./' + env + '.json');

defaultConfig.env=env;

const config = require('rc')(process.env.npm_package_name || 'convospot-socket', _.extend(defaultConfig, envConfig));

module.exports = config;
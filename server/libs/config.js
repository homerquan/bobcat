//Using RC to read settings in /etc/appnamerc
const defaultConfig = require('../config/env');
const config = require('rc')(process.env.npm_package_name||'convospot-socket', defaultConfig);
module.exports = config;
'use strict';

import $ from './libs/dollar';
const app = require('http').createServer();


$['welcome']();
$['socketio'](app,require('./config/socketio'));
app.listen($['config'].PORT);
$['logger'].info('Socket server starts on port ' + $['config'].PORT);
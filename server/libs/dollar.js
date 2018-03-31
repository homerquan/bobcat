import logger from './logger';

let instance = null;

class Dollar {
  constructor() {
    if (!instance) {
      instance = this;
    }
    this.ms = require('./seneca');
	  this.socketio = require('./socketio');
    this.config = require('../config/env');
    this.grpc = require('./grpc');
    this.welcome = require('./welcome');
    this.logger = logger;
    return instance;
  }
}

const dollar = new Dollar();

export default dollar;
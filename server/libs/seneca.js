"use strict";
const Promise = require('bluebird');
const seneca = Promise.promisifyAll(require('seneca')());
const ms = require('../microservices');
const config = require('../config/seneca');

var start = function(services, option) {
    var senecaService = seneca
        .use('seneca-amqp-transport')
        .use(services)
        .listen(option.server);

    console.log(option.clients);
    
    option.clients.forEach(client=>{
    	senecaService.client(client);
    });

    return senecaService;
}

var handler = start(ms, config);

/**
 * A function to send act to senca
 * e.g., seneca.act(role,cmd,data)
 */
module.exports = {
	act: function(role, cmd, data) {
		if (handler && cmd) {
			return handler.actAsync(`role:${role},cmd:${cmd}`, data);
		}
	}
}
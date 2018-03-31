/**
 * One server (multi pins)
 * Many clients
 */

import config from './env';

module.exports = {
    server: {
        type: 'amqp',
        url: config.AMQP_CONN,
        pin: 'role:convospot-socket' 
    },
    clients: [{
        type: 'amqp',
        url: config.AMQP_CONN,
        pin: 'role:convospot-api'
    },{
        type: 'amqp',
        url: config.AMQP_CONN,
        pin: 'role:convospot-console'
    },{
        type: 'amqp',
        url: config.AMQP_CONN,
        pin: 'role:convospot-engine'
    }]
}

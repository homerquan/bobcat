/**
 * Socket.io configuration
 */

'use strict';

import config from '../config/env';
import Logger from '../libs/logger';
import jwt from 'jsonwebtoken';
import pubsub from 'pubsub-js';
import $ from './dollar';

// When the user disconnects.. perform this
function onDisconnect(socket) {
    require('../socket/logic').disconnect(socket);
}

// When the user connects, perform this
function onConnect(socket) {
    // When the client emits 'info', this listens and executes
    socket.on('info', function(data) {
        socket.log(JSON.stringify(data, null, 2));
    });

    require('../socket/logic').connect(socket);
    // Insert sockets below

}

// Before connect, auth first
function onAuth(socket) {
    var query = socket.handshake.query;
    if (query.token && query.cid) {
        // Call a microservice to API to verify convo
        $['ms'].act('convospot-api', 'check_convo', {
            token: query.token,
            id: query.cid
        }).then(msg => {
            if (!msg.data) {
                socket.log('THE CONVOSATION NOT EXIST');
                socket.disconnect();
            } else {
                socket.join(query.cid);
                socket.join(query.vid);
            }
        });
    } else {
        socket.log('MISSING CREDIENTIAL');
        socket.disconnect();
    }
}

module.exports = function(server, config) {
    var io = require('socket.io')(server, config.options);
    
     // cors
    io.set('origins','*:*');

    var nio = io.of(config.ns);
    $['logger'].info("Socket.io started");

    pubsub.subscribe('create_message', (topic, entity) => {
        if(entity && entity.destinationId)
          nio.to(entity.destinationId).emit('create_message', entity);
        if(entity && entity.source==="visitor") // also send to widget to confirm receive
          nio.to(entity.sourceId).emit('create_message', entity);  
    });

    pubsub.subscribe('start_ask_engine', (topic, entity) => {
        if(entity && entity.destinationId)
          nio.to(entity.destinationId).emit('start_ask_engine', entity);
    });

    nio.on('connection', function(socket) {
        socket.address = socket.request.connection.remoteAddress +
            ':' + socket.request.connection.remotePort;
        socket.connectedAt = new Date();
        socket.log = function(...data) {
            $['logger'].info(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
        };

        onAuth(socket);

        // Call onDisconnect.
        socket.on('disconnect', function() {
            onDisconnect(socket);
            socket.log('DISCONNECTED');
        });

        // Call onConnect.
        onConnect(socket);

        socket.log('CONNECTED');
        nio.emit('connect_confirm', 'ok');
    });
};
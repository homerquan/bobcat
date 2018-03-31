/**
 * Debug socket.io by monitoring all events 
 */

import io from 'socket.io-client';
const config = require('../config/env');

var socketURL = `http://${config.HOST}:${config.PORT}/${config.SIO_NS}`;

var options = {
    transports: ['websocket'],
    'force new connection': true,
    path: '/convospot-widget'
};

var client = io.connect(socketURL, options);

client.on('connect', function(data) {
    console.log("client receive connect" + data);
});

client.on('connect_confirm', function(data) {
    console.log('confirm');
});

//for debug on all events
var onevent = client.onevent;
client.onevent = function (packet) {
    var args = packet.data || [];
    onevent.call (this, packet);    // original call
    packet.data = ["*"].concat(args);
    onevent.call(this, packet);      // additional call to catch-all
};

client.on('*', function(event, data) {
    var time = new Date();
    console.log(time+' '+event);
    console.log(time+' '+data);
});

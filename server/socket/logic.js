'use strict';

import _ from 'lodash';
import $ from '../libs/dollar';

/**
 * Connect logic
 */
exports.connect = function(socket) {
   
    var query = socket.handshake.query;

    // Send cid to update conversation status
    if (query.type === 'widget') {
        $['ms'].act('convospot-api', 'update_conversation_status', {
            status: 'online',
            id: query.cid,
            sid: socket.id
        });
    }

    socket.on('analytics', function(msg) {
        console.log(msg.data);
        let request = new $['grpc'].messages.Request();
        request.setMessage('');
        request.setTypecode(102);
        request.setType('visitor_analytics');
        request.setTimestamp(0);
        request.setData(JSON.stringify({
            eid: msg.data.id || '',
            event: msg.data.event || '',
            intention: msg.data.intention || '',
            timestamp: 1000,
            conversation: query.cid,
            visitor: query.vid,
            bot: query.bid
        }));
        $['grpc'].client.ask(request,function(){});
    });
};

/**
 * Disconnect logic
 */
exports.disconnect = function(socket) {
    var query = socket.handshake.query;
    $['ms'].act('convospot-api', 'update_conversation_status', {
        status: 'off',
        id: query.cid,
        sid: socket.id
    });
}

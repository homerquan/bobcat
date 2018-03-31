// microservice from api
import pubsub from 'pubsub-js';

module.exports = [{
    pattern: 'role:convospot-socket,cmd:create_message', //pattern in seneca
    action: (msg, cb) => {
        pubsub.publish('create_message', msg);
        cb(null, {message:'Send to widget'});
    }
},{
    pattern: 'role:convospot-socket,cmd:start_ask_engine', //pattern in seneca
    action: (msg, cb) => {
        pubsub.publish('start_ask_engine', msg);
        cb(null, {message:'Send to widget'});
    }
}];


// microservice from api
import pubsub from 'pubsub-js';

module.exports = [{
    pattern: 'role:convospot-socket,cmd:got_answer', //pattern in seneca
    action: (msg, cb) => {
        pubsub.publish('got_answer', msg);
        cb(null, {test:'socket-ok'});
    }
}];
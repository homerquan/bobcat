import should from 'should';
import io from 'socket.io-client';
const server = require('../index');
const config = require('../config/env');

var socketURL = `http://${config.HOST}:${config.PORT}/${config.SIO_NS}`;

var options ={
  transports: ['websocket'],
  'force new connection': true,
  path: '/convospot-widget'
};

describe("Convospot Socketio Server",function(){

  it('Should confirm connect',function(done){
    var client = io.connect(socketURL, options);

    client.on('connect',function(data){
      console.log("client receive connect"+data);
      //add user, create conversation
    });

    client.on('connect_confirm',function(data){
      data.should.be.type('string');
      /* If this client doesn't disconnect it will interfere 
      with the next test */
      client.disconnect();
      done(); 
    });
  });

});
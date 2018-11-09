import openSocket from 'socket.io-client';

import {URL_SOCKET} from './../constants/config';
const socket = openSocket(URL_SOCKET);
console.log(URL_SOCKET, socket);
function connectIO(cb) {
  socket.on('change', (message) => {
    cb(message);
  })
}

function CallingIO(cb) {
  socket.on("Calling:App\\Events\\Calling", function(message){
    cb(message);
  });
}
export { connectIO, CallingIO }



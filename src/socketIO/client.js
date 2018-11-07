import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:9999/');

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

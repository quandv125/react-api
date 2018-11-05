import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4001/');

function connectIO(cb) {
  socket.on('change color', (message) => {
    // console.log(message)
    cb(message);
  })
}

export { connectIO }

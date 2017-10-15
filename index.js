const net = require('net');

const HOST = '127.0.0.1';
const PORT = 5000;
const STUDENT_NUMBER = 14317110

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
var server = net.createServer()
server.listen(PORT, HOST);
console.log('Server listening on ' + HOST +':'+ PORT);
server.on('connection', (socket) => {

    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + socket.remoteAddress +':'+ socket.remotePort);

    // Add a 'data' event handler to this instance of socket
    socket.on('data', (data) => {

        console.log('DATA ' + socket.remoteAddress + ': ' + data);

        switch (data.toString()) {
          case 'HELO text\n':
            socket.write('HELO text\nIP:${HOST}\nPort:${PORT}\nStudentID:${STUDENT_NUMBER}\n')
          break;
          case 'KILL_SERVICE\n':
            server.close(() => {
              console.log('Server closed.');
            });
            socket.destroy();
          default:
          break;
        }

    });

    // Add a 'close' event handler to this instance of socket
    socket.on('close', (data) => {
        console.log('CLOSED: ' + socket.remoteAddress +' '+ socket.remotePort);
    });
});

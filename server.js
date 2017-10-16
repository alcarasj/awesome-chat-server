const net = require('net');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " PORT_NUMBER");
    process.exit(-1);
}

const HOST = '127.0.0.1';
const PORT = process.argv[2];
const STUDENT_NUMBER = 14317110

const MESSAGE_FORMATS = [
  "^JOIN_CHATROOM: (-?[\d]+) and the word (.*)$",
  "^I have the number (-?[\d]+) and the word (.*)$",
]

var server = net.createServer();
server.listen(PORT, HOST);
console.log('Server listening on ' + HOST +':'+ PORT);
server.on('connection', (socket) => {
    console.log('CONNECTED: ' + socket.remoteAddress +':'+ socket.remotePort);

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
            break;
          case '^I have the number (-?[\d]+) and the word (.*)$':
          default:
          break;
        }
    });

    socket.on('close', (data) => {
        console.log('CLOSED: ' + socket.remoteAddress +' '+ socket.remotePort);
    });
});

const net = require('net');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " PORT_NUMBER");
    process.exit(-1);
}

const HOST = '127.0.0.1';
const PORT = process.argv[2];
var message = 'Hello world!\n\n';
const MESSAGES = [
  'HELO Jerico\n',
  'KILL_SERVICE\n',
  'JOIN_CHATROOM: AwesomeChat\nCLIENT_IP: 0\nPORT: 0\nCLIENT_NAME: Jerico\n',
  'LEAVE_CHATROOM: 1\nJOIN_ID: 1\nCLIENT_NAME: Jerico\n',
  'CHAT: 1\nJOIN_ID: 1\nCLIENT_NAME: Jerico\nMESSAGE: ' + message + '\n'
];

var client = new net.Socket();
client.connect(PORT, HOST, () => {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write(MESSAGES[3]);
});

client.on('data', (data) => {
    console.log(data.toString());
});

client.on('close', () => {
    console.log('Connection closed');
});

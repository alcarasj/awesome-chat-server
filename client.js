const net = require('net');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " PORT_NUMBER");
    process.exit(-1);
}

const HOST = '127.0.0.1';
const PORT = process.argv[2];
const MESSAGES = [
  'JOIN_CHATROOM: Duplex\nCLIENT_IP: 0\nPORT: 0\nCLIENT_NAME: Jerico\n',
];

var client = new net.Socket();
client.connect(PORT, HOST, () => {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write('KILL_SERVICE\n');
});

client.on('data', (data) => {
    console.log('DATA: ' + data);
    client.destroy();
});

client.on('close', () => {
    console.log('Connection closed');
});

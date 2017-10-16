const net = require('net');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " PORT_NUMBER");
    process.exit(-1);
}

const HOST = '127.0.0.1';
const PORT = process.argv[2];
const STUDENT_NUMBER = 14317110;

var clients = [];
var chatRooms = [];
var server = net.createServer();
server.listen(PORT, HOST);
console.log('Server listening on ' + HOST +':'+ PORT);
server.on('connection', (socket) => {
    console.log('CONNECTED: ' + socket.remoteAddress +':'+ socket.remotePort);

    socket.on('data', (data) => {
        var dataString = data.toString().trim().replace(/\n/g, ' ').split(' ');
        console.log(dataString);
        var responseSent = false;
        switch (dataString.length) {
          case 1:
            if (dataString[0] === 'KILL_SERVICE') {
              server.close(() => {
                console.log('Server closed.');
              });
              responseSent = true;
              socket.destroy();
            }
            break;
          case 2:
            if (dataString[0] === 'HELO') {
              socket.write('HELO ' + dataString[1] + '\nIP:' + HOST + '\nPort:' + PORT + '\nStudentID:' + STUDENT_NUMBER + '\n');
              responseSent = true;
            }
            break;
          case 6:
            if (dataString[0] === 'LEAVE_CHATROOM:' && dataString[2] === 'JOIN_ID:'
              && dataString[4] === 'CLIENT_NAME:') {
                //Handle
              }
            break;
          case 8:
            if (dataString[0] === 'JOIN_CHATROOM:' && dataString[2] === 'CLIENT_IP:'
              && dataString[4] === 'PORT:' && dataString[6] === 'CLIENT_NAME:') {
                chatRoomName = dataString[1];
                clientName = dataString[7];
                var chatRoomIndex = getChatRoomIndex(chatRoomName);
                socket.chatRoom = chatRoomName;
                socket.name = clientName;
                var clientID = getClientID(socket);
                socket.write('JOINED_CHATROOM: ' + chatRoomName + '\nSERVER_IP: ' + HOST + '\nPORT: ' + PORT + '\n' +
                'ROOM_REF: '+ chatRoomIndex + '\nJOIN_ID: ' + clientID + '\n');
                var message = clientName + ' has joined ' + chatRoomName + '.\n\n';
                console.log(message);
                sendMessage(chatRoomName, message, clientName);
                responseSent = true;
            }
            break;
        }

        if (!responseSent) {
          socket.write('ERROR_CODE: 400\nERROR_DESCRIPTION: Bad request.\n');
          responseSent = true;
        }
    });

    function getChatRoomIndex(chatRoomName) {
      if (chatRooms.includes(chatRoomName)) {
        return chatRooms.indexOf(chatRoomName);
      } else {
        return chatRooms.push(chatRoomName) - 1;
      }
    }

    function getClientID(clientSocket) {
      var clientName = clientSocket.name;
      for (var i = 0; i < clients.length; i++) {
        if (clients[i].name === clientName) {
          return i;
        }
      }
      return clients.push(clientSocket) - 1;
    }

    function sendMessage(chatRoomName, message, senderName) {
      var recipients = clients.filter((client) => {
        return client.chatRoom === chatRoomName;
      });
      if (recipients.length > 0) {
        recipients.forEach((recipient) => {
          recipient.write('CHAT: ' + chatRoomName + '\nCLIENT_NAME: ' + senderName + '\nMESSAGE: ' + message + '\n');
        });
      }
    }
});

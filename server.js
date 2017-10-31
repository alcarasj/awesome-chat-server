const net = require('net');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " PORT_NUMBER");
    process.exit(-1);
}

const HOST = '0.0.0.0';
const PORT = process.argv[2];
const STUDENT_NUMBER = 14317110;

/*
STORE CONNECTED SOCKETS
Client: {
  id: int (also used for JOIN_ID)
  name: String
  chatRooms: String[]
}
*/
var clients = [];

/*
STORE CHAT ROOMS AS STRINGS
*/
var chatRooms = [];
var clientCounter = 0;

var server = net.createServer();
server.listen(PORT, HOST);
console.log('Server listening on ' + HOST +':'+ PORT);
server.on('connection', (socket) => {
    socket.on('data', (data) => {
        var dataString = data.toString().trim().replace(/\n/g, ' ').replace(/:/g, ' ').split(' ');
        console.log(dataString);
        var success = false;
        switch (dataString.length) {
          case 1:
            if (dataString[0] === 'KILL_SERVICE') {
              server.close(() => {
                console.log('Server closed.');
              });
              socket.destroy();
              success = true;
            }
            break;
          case 2:
            if (dataString[0] === 'HELO') {
              var text = dataString[1];
              socket.write('HELO ' + text + '\nIP:' + HOST + '\nPort:' + PORT + '\nStudentID:' + STUDENT_NUMBER + '\n');
              success = true;
            }
            break;
          case 6:
            if (dataString[0] === 'LEAVE_CHATROOM' && dataString[2] === 'JOIN_ID'
              && dataString[4] === 'CLIENT_NAME') {
                var chatRoomName = dataString[1];
                var clientID = dataString[3];
                var clientName = dataString[5];

                if (isClientInChatRoom(clientName, chatRoomName)) {
                  removeClientFromChatRoom(clientName, chatRoomName);
                  var chatRoomID = getChatRoomID(chatRoomName);
                  if (chatRoomID !== -1) {
                    socket.write('LEFT_CHATROOM:' + chatRoomID + '\nJOIN_ID:' + clientID + '\n');
                    var message = clientName + ' has left this chatroom.\n\n';
                    if (sendMessage(chatRoomName, chatRoomID, message, clientName)) {
                      success = true;
                    }
                  }
                }
              } else if (dataString[0] === 'DISCONNECT' && dataString[2] === 'PORT'
                && dataString[4] === 'CLIENT_NAME') {
                  var clientName = dataString[5];

                  if (doesClientExist(clientName)) {
                    clientIndex = getClientIndex(clientName);
                    var message = clientName + ' has left this chatroom.\n\n';
                    clients[clientIndex].chatRooms.forEach((chatRoomName) => {
                      var chatRoomID = getChatRoomID(chatRoomName);
                      sendMessage(chatRoomName, chatRoomID, message, clientName);
                    });

                    removeClient(clientName);
                    socket.destroy();
                    success = true;
                  }
              }
            break;
          case 8:
            if (dataString[0] === 'JOIN_CHATROOM' && dataString[2] === 'CLIENT_IP'
              && dataString[4] === 'PORT' && dataString[6] === 'CLIENT_NAME') {
                var chatRoomName = dataString[1];
                var clientName = dataString[7];
                var debug = doesChatRoomExist(chatRoomName)
                if (!doesChatRoomExist(chatRoomName)) {
                  addNewChatRoom(chatRoomName);
                }
                if (!doesClientExist(clientName)) {
                  socket.id = ++clientCounter;
                  socket.name = clientName;
                  socket.chatRooms = [];
                  addNewClient(socket);
                }
                if (!isClientInChatRoom(clientName, chatRoomName)) {
                  addClientToChatRoom(clientName, chatRoomName);
                  var chatRoomID = getChatRoomID(chatRoomName);
                  var clientID = getClientID(clientName);
                  if (chatRoomID !== -1 && clientID !== -1) {
                    socket.write('JOINED_CHATROOM:' + chatRoomName + '\nSERVER_IP:' + HOST + '\nPORT:' + PORT + '\n' +
                    'ROOM_REF:'+ chatRoomID + '\nJOIN_ID:' + clientID + '\n');
                    var message = clientName + ' has joined this chatroom.\n\n';
                    if (sendMessage(chatRoomName, chatRoomID, message, clientName)) {
                      success = true;
                    }
                  }
                }
            }
            break;
        }

        if (!success) {
          socket.write('ERROR_CODE:400\nERROR_DESCRIPTION:Bad request.\n');
        }
    });

    socket.on('end', () => {
      socket.destroy();
    });

    addNewClient = (clientSocket) => clients.push(clientSocket);

    addNewChatRoom = (chatRoomName) => chatRooms.push(chatRoomName);

    removeClient = (clientName) => clients.splice(getClientID(clientName) - 1, 1);

    doesChatRoomExist = (chatRoomName) => { return chatRooms.includes(chatRoomName); }

    doesClientExist = (clientName) => {
      for (var i = 0; i < clients.length; i++) {
        if (clients[i].name === clientName) {
          return true;
        }
      }
      return false;
    }

    isClientInChatRoom = (clientName, chatRoomName) => {
      for (var i = 0; i < clients.length; i++) {
        if (clients[i].name === clientName && clients[i].chatRooms.includes(chatRoomName)) {
          return true;
        }
      }
      return false;
    }

    addClientToChatRoom = (clientName, chatRoomName) => {
      for (var i = 0; i < clients.length; i++) {
        if (clients[i].name === clientName && !clients[i].chatRooms.includes(chatRoomName)) {
          return clients[i].chatRooms.push(chatRoomName);
        }
      }
    }

    removeClientFromChatRoom = (clientName, chatRoomName) => {
      for (var i = 0; i < clients.length; i++) {
        if (clients[i].name === clientName && clients[i].chatRooms.includes(chatRoomName)) {
          return clients[i].chatRooms.filter((chatRoom) => {
            return chatRoom !== chatRoomName;
          });
        }
      }
    }

    getChatRoomID = (chatRoomName) => { return chatRooms.indexOf(chatRoomName) + 1; }

    getClientID = (clientName) => {
      for (var i = 0; i < clients.length; i++) {
        if (clients[i].name === clientName) {
          return clients[i].id;
        }
      }
      return -1;
    }

    getClientIndex = (clientName) => {
      for (var i = 0; i < clients.length; i++) {
        if (clients[i].name === clientName) {
          return i;
        }
      }
      return -1;
    }

    sendMessage = (chatRoomName, chatRoomID, message, senderName) => {
      var recipients = clients.filter((client) => {
        return client.chatRooms.includes(chatRoomName);
      });
      if (recipients.length > 0) {
        recipients.forEach((recipient) => {
          recipient.write('CHAT:' + chatRoomID + '\nCLIENT_NAME:' + senderName + '\nMESSAGE:' + message + '\n');
        });
        return true;
      } else {
        return false;
      }
    }
});

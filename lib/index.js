"use strict";

var _websocket = require("websocket");

var _repl = _interopRequireDefault(require("repl"));

var _http = _interopRequireDefault(require("http"));

var _chess = require("./chess");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

process.title = 'node-chat';
var webSocketsServerPort = 1337;

var server = _http["default"].createServer(function (request, response) {
  response.end("hello online chess. Only WebSockets");
});

server.listen(webSocketsServerPort, function () {
  console.log("".concat(new Date(), " Server is listening on port ").concat(webSocketsServerPort));
});
var wsServer = new _websocket.server({
  httpServer: server
});
wsServer.on('request', function (request) {
  console.log("".concat(new Date(), " Connection from origin ").concat(request.origin, ".")); // accept connection - you should check 'request.origin' to
  // make sure that client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)

  var connection = request.accept(null, request.origin);
  console.log("".concat(new Date(), " Connection accepted."));
  var user = new _chess.User(connection); // user sent some message

  connection.on('message', function (event) {
    if (event.type === "utf8") {
      var message = JSON.parse(event.utf8Data);
      console.log(message);

      if (message.type === "connection") {
        user.connection.sendUTF(JSON.stringify({
          type: "connection",
          id: user.id
        }));
        console.log("User Created");
      } else if (message.type === "create_room") {
        user.createRoom(message["team"]);
        user.connection.sendUTF(JSON.stringify({
          type: "game_room",
          id: user.room.id,
          board: user.room.game.board,
          turn: user.room.game.turn,
          team: user.team
        }));
        console.log("Room Created");
      } else if (message.type === "join_room") {
        user.joinRoom(message["game_id"], message["team"]);
        user.connection.sendUTF(JSON.stringify({
          type: "game_room",
          id: user.room.id,
          board: user.room.game.board,
          turn: user.room.game.turn,
          team: user.team
        }));
        console.log("Game Attached");
      } else if (message.type === "chess_move") {
        user.room.move = message["move"];
        user.room.users.forEach(function (aUser) {
          if (aUser.id !== user.id) {
            aUser.connection.sendUTF(JSON.stringify({
              type: "chess_move",
              move: message["move"]
            }));
          }
        });
      }
    }
  }); // user disconnected

  connection.on('close', function (connection) {
    user.exitRoom();
    console.log(user.id, " User Removed");
  });
});

var replServer = _repl["default"].start({
  prompt: "my-app > "
});

replServer.context.User = _chess.User;
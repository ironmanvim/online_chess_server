import {server as WebSocketServer} from "websocket";
import repl from "repl";
import http from "http";
import {
    User
} from "./chess";

process.title = 'node-chat';

let webSocketsServerPort = 1337;

let server = http.createServer((request, response) => {
    response.end("hello online chess. Only WebSockets");
});

server.listen(webSocketsServerPort, () => {
    console.log(`${new Date()} Server is listening on port ${webSocketsServerPort}`);
});

let wsServer = new WebSocketServer({
    httpServer: server
});
wsServer.on('request', (request) => {

    console.log(`${new Date()} Connection from origin ${request.origin}.`);
    // accept connection - you should check 'request.origin' to
    // make sure that client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    let connection = request.accept(null, request.origin);

    console.log(`${new Date()} Connection accepted.`);
    const user = new User(connection);

    // user sent some message
    connection.on('message', function (event) {
        if (event.type === "utf8") {
            const message = JSON.parse(event.utf8Data);
            console.log(message);
            if (message.type === "connection") {
                user.connection.sendUTF(JSON.stringify({
                    type: "connection",
                    id: user.id,
                }));
                console.log("User Created");
            } else if (message.type === "create_room") {
                user.createRoom(message["team"]);

                user.connection.sendUTF(JSON.stringify({
                    type: "game_room",
                    id: user.room.id,
                    board: user.room.game.board,
                    turn: user.room.game.turn,
                    team: user.team,
                }));
                console.log("Room Created");
            } else if (message.type === "join_room") {
                user.joinRoom(message["game_id"], message["team"]);

                user.connection.sendUTF(JSON.stringify({
                    type: "game_room",
                    id: user.room.id,
                    board: user.room.game.board,
                    turn: user.room.game.turn,
                    team: user.team,
                }));
                console.log("Game Attached");
            } else if (message.type === "chess_move") {
                user.room.move = message["move"];

                user.room.users.forEach((aUser) => {
                    if (aUser.id !== user.id) {
                        aUser.connection.sendUTF(JSON.stringify({
                            type: "chess_move",
                            move: message["move"],
                        }));
                    }
                });
            }
        }
    });
    // user disconnected
    connection.on('close', function (connection) {
        user.exitRoom();
        console.log(user.id, " User Removed");
    });
});

let replServer = repl.start({
    prompt: "my-app > ",
});

replServer.context.User = User;
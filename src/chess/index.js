import defaultGameBoard from "./defaultGameBoard";
import {cloneDeep} from "lodash";


export class Room {
    static #id_generator = 1;
    static #rooms = [];

    static getRoom(id) {
        return Room.#rooms.find(room => id === room.id);
    }

    #id;
    #board;
    #turn;
    #deadPieces;
    #users;

    constructor(user) {
        this.#id = Room.#id_generator++;
        this.#board = cloneDeep(defaultGameBoard);
        this.#turn = "w";
        this.#deadPieces = [];
        this.#users = [user];

        Room.#rooms.push(this);
    }

    get id() {
        return this.#id;
    }

    get users() {
        return this.#users;
    }

    get game() {
        return {
            id: this.#id,
            board: this.#board,
            turn: this.#turn,
            deadPieces: this.#deadPieces
        }
    }

    set move(moveObject) {
        const {
            from: {
                row: f_x, column: f_y
            },
            to: {
                row: t_x, column: t_y
            }
        } = moveObject;

        if (this.#board[t_x][t_y][0] !== "") {
            this.#deadPieces.push(this.#board[t_x][t_y][0]);
        }
        this.#board[t_x][t_y][0] = this.#board[f_x][f_y][0];
        this.#board[f_x][f_y][0] = "";
        this.#board[f_x][f_y][2] = false;
        if (this.#turn === "w")
            this.#turn = "b";
        else
            this.#turn = "w";
        console.log("Move Done");
    }

    joinRoom(user) {
        this.#users.push(user);
    }

    kickUser(user) {
        const user_index = this.#users.findIndex(aUser => aUser === user);
        this.#users.splice(user_index, 1);
    }
}

export class User {
    static #id_generator = 1;
    static #users = [];
    #id;
    #room;
    #team;
    #connection;

    constructor(connection) {
        this.#id = User.#id_generator++;
        this.#room = null;
        this.#connection = connection;
        this.#team = null;

        User.#users.push(this);
    }

    get id() {
        return this.#id;
    }

    get room() {
        return this.#room;
    }

    get team() {
        return this.#team;
    }

    get connection() {
        return this.#connection;
    }

    createRoom(team) {
        this.#room = new Room(this);
        this.#team = team;
    }

    joinRoom(id, team) {
        this.#room = Room.getRoom(id);
        this.#room.joinRoom(this);
        this.#team = team;
    }

    exitRoom() {
        if (this.#room) {
            this.#room.kickUser(this);
            this.#room = null;
        }
    }

    static getUser = (userID) => {
        return User.#users.find(user => userID === user.id);
    };

    static removeUser = (userID) => {
        const user = User.getUser(userID);
        user.exitRoom();

        const userIndex = User.#users.findIndex(user => userID === user.id);
        User.#users.splice(userIndex, 1);
    }
}

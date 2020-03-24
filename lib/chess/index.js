"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.Room = void 0;

var _defaultGameBoard = _interopRequireDefault(require("./defaultGameBoard"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var Room = /*#__PURE__*/function () {
  _createClass(Room, null, [{
    key: "getRoom",
    value: function getRoom(id) {
      return _classStaticPrivateFieldSpecGet(Room, Room, _rooms).find(function (room) {
        return id === room.id;
      });
    }
  }]);

  function Room(user) {
    var _Room$id_generator, _Room$id_generator2;

    _classCallCheck(this, Room);

    _id.set(this, {
      writable: true,
      value: void 0
    });

    _board.set(this, {
      writable: true,
      value: void 0
    });

    _turn.set(this, {
      writable: true,
      value: void 0
    });

    _deadPieces.set(this, {
      writable: true,
      value: void 0
    });

    _users.set(this, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _id, (_classStaticPrivateFieldSpecSet(Room, Room, _id_generator, (_Room$id_generator2 = +_classStaticPrivateFieldSpecGet(Room, Room, _id_generator)) + 1), _Room$id_generator2));

    _classPrivateFieldSet(this, _board, (0, _lodash.cloneDeep)(_defaultGameBoard["default"]));

    _classPrivateFieldSet(this, _turn, "w");

    _classPrivateFieldSet(this, _deadPieces, []);

    _classPrivateFieldSet(this, _users, [user]);

    _classStaticPrivateFieldSpecGet(Room, Room, _rooms).push(this);
  }

  _createClass(Room, [{
    key: "joinRoom",
    value: function joinRoom(user) {
      _classPrivateFieldGet(this, _users).push(user);
    }
  }, {
    key: "kickUser",
    value: function kickUser(user) {
      var user_index = _classPrivateFieldGet(this, _users).findIndex(function (aUser) {
        return aUser === user;
      });

      _classPrivateFieldGet(this, _users).splice(user_index, 1);
    }
  }, {
    key: "id",
    get: function get() {
      return _classPrivateFieldGet(this, _id);
    }
  }, {
    key: "users",
    get: function get() {
      return _classPrivateFieldGet(this, _users);
    }
  }, {
    key: "game",
    get: function get() {
      return {
        id: _classPrivateFieldGet(this, _id),
        board: _classPrivateFieldGet(this, _board),
        turn: _classPrivateFieldGet(this, _turn),
        deadPieces: _classPrivateFieldGet(this, _deadPieces)
      };
    }
  }, {
    key: "move",
    set: function set(moveObject) {
      var _moveObject$from = moveObject.from,
          f_x = _moveObject$from.row,
          f_y = _moveObject$from.column,
          _moveObject$to = moveObject.to,
          t_x = _moveObject$to.row,
          t_y = _moveObject$to.column;

      if (_classPrivateFieldGet(this, _board)[t_x][t_y][0] !== "") {
        _classPrivateFieldGet(this, _deadPieces).push(_classPrivateFieldGet(this, _board)[t_x][t_y][0]);
      }

      _classPrivateFieldGet(this, _board)[t_x][t_y][0] = _classPrivateFieldGet(this, _board)[f_x][f_y][0];
      _classPrivateFieldGet(this, _board)[f_x][f_y][0] = "";
      _classPrivateFieldGet(this, _board)[f_x][f_y][2] = false;
      if (_classPrivateFieldGet(this, _turn) === "w") _classPrivateFieldSet(this, _turn, "b");else _classPrivateFieldSet(this, _turn, "w");
      console.log("Move Done");
    }
  }]);

  return Room;
}();

exports.Room = Room;

var _id = new WeakMap();

var _board = new WeakMap();

var _turn = new WeakMap();

var _deadPieces = new WeakMap();

var _users = new WeakMap();

var _id_generator = {
  writable: true,
  value: 1
};
var _rooms = {
  writable: true,
  value: []
};

var User = /*#__PURE__*/function () {
  function User(connection) {
    var _User$id_generator, _User$id_generator2;

    _classCallCheck(this, User);

    _id2.set(this, {
      writable: true,
      value: void 0
    });

    _room.set(this, {
      writable: true,
      value: void 0
    });

    _team.set(this, {
      writable: true,
      value: void 0
    });

    _connection.set(this, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _id2, (_classStaticPrivateFieldSpecSet(User, User, _id_generator2, (_User$id_generator2 = +_classStaticPrivateFieldSpecGet(User, User, _id_generator2)) + 1), _User$id_generator2));

    _classPrivateFieldSet(this, _room, null);

    _classPrivateFieldSet(this, _connection, connection);

    _classPrivateFieldSet(this, _team, null);

    _classStaticPrivateFieldSpecGet(User, User, _users2).push(this);
  }

  _createClass(User, [{
    key: "createRoom",
    value: function createRoom(team) {
      _classPrivateFieldSet(this, _room, new Room(this));

      _classPrivateFieldSet(this, _team, team);
    }
  }, {
    key: "joinRoom",
    value: function joinRoom(id, team) {
      _classPrivateFieldSet(this, _room, Room.getRoom(id));

      _classPrivateFieldGet(this, _room).joinRoom(this);

      _classPrivateFieldSet(this, _team, team);
    }
  }, {
    key: "exitRoom",
    value: function exitRoom() {
      if (_classPrivateFieldGet(this, _room)) {
        _classPrivateFieldGet(this, _room).kickUser(this);

        _classPrivateFieldSet(this, _room, null);
      }
    }
  }, {
    key: "id",
    get: function get() {
      return _classPrivateFieldGet(this, _id2);
    }
  }, {
    key: "room",
    get: function get() {
      return _classPrivateFieldGet(this, _room);
    }
  }, {
    key: "team",
    get: function get() {
      return _classPrivateFieldGet(this, _team);
    }
  }, {
    key: "connection",
    get: function get() {
      return _classPrivateFieldGet(this, _connection);
    }
  }]);

  return User;
}();

exports.User = User;

var _id2 = new WeakMap();

var _room = new WeakMap();

var _team = new WeakMap();

var _connection = new WeakMap();

var _id_generator2 = {
  writable: true,
  value: 1
};
var _users2 = {
  writable: true,
  value: []
};

_defineProperty(User, "getUser", function (userID) {
  return _classStaticPrivateFieldSpecGet(User, User, _users2).find(function (user) {
    return userID === user.id;
  });
});

_defineProperty(User, "removeUser", function (userID) {
  var user = User.getUser(userID);
  user.exitRoom();

  var userIndex = _classStaticPrivateFieldSpecGet(User, User, _users2).findIndex(function (user) {
    return userID === user.id;
  });

  _classStaticPrivateFieldSpecGet(User, User, _users2).splice(userIndex, 1);
});
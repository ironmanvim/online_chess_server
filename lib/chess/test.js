"use strict";

var _ = require("./");

var _repl = _interopRequireDefault(require("repl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var replServer = _repl["default"].start({
  prompt: "my-app > "
});

replServer.context.User = _.User;
replServer.context.Room = _.Room;
import {Room, User} from "./"
import repl from "repl";

let replServer = repl.start({
    prompt: "my-app > ",
});

replServer.context.User = User;
replServer.context.Room = Room;
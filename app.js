import express from "express";
import cors from "cors";
import session from "express-session"; // import new server session library
import AuthController from "./users/auth-controller.js";

import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";

const app = express();

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
); // configure cors right after instantiating express

app.use(express.json()); // Parse JSON from HTTP request body

app.use( // configure server session
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: false,
        store: new session.MemoryStore(),
    })
)

TuitsController(app)
HelloController(app)
UserController(app)
AuthController(app)

app.listen(process.env.PORT || 4000);
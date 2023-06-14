import * as usersDao from "./users-dao.js";

var currentUserVar;

const AuthController = (app) => {

    // The register API retrieves the username and password from the request body.
    // If there's already a user with that username, then we responds with an error. 
    // Otherwise we create the new user and store it in the session's currentUser property so we can remember that this new user is now the currently logged in user.
    const register = (req, res) => {
        const username = req.body.username;
        const user = usersDao.findUserByUsername(username);

        if (user) {
            res.sendStatus(409);
            return;
        }

        const newUser = usersDao.createUser(req.body);
        currentUserVar = newUser;
        res.json(newUser);
    };

    // Existing user can identify themselves by providing their credentials as username and password.
    // The login API below looks up the user by their credentials and responds with the user if they exist.
    // Otherwise we respond with an error.
    const login = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = usersDao.findUserByCredentials(username, password);

        if (user) {
            currentUserVar = user;
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    };

    // If a user has already logged in, we can retrieve the current user by using the profile API
    const profile = (req, res) => {
        const currentUser = currentUserVar;

        if (!currentUser) {
            res.sendStatus(404);
            return;
        }

        res.json(currentUser);
    };

    // Logout by destroying the session
    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = (req, res) => {

        const uid = currentUserVar;

        const updated = usersDao.updateUser(uid, req.body);

        if (!updated) {
            res.sendStatus(404);
            return;
        }

        currentUserVar = updated;
        res.json(updated);
    };

    app.post("/api/users/register", register);
    app.post("/api/users/login",    login);
    app.post("/api/users/profile",  profile);
    app.post("/api/users/logout",   logout);
    app.put ("/api/users",          update);
};

export default AuthController;
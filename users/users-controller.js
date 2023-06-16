// import people from './users.js'

// let users = people

import * as usersDao from "./users-dao.js";

const UserController = (app) => {
    app.get('/api/users', findUsers)
    app.get('/api/users/:uid', findUserById)
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const createUser = async (req, res) => {
    const newUser = await usersDao.createUser(req.body);
    res.json(newUser);
};  

const findAllUsers = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    if (username && password) {
        const user = await usersDao.findUserByCredentials(username, password); // use DAO
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } else if (username) {
        const user = await usersDao.findUserByUsername(username); // use DAO
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } else {
        const users = await usersDao.findAllUsers(); // use DAO
        res.json(users);
    }
}; 

const findUsers = (req, res) => {
    const type = req.query.type

    if (type) {
        const usersOfType = users.filter(u => u.type === type)

        res.json(usersOfType)

        return
    }

    res.json(users)
}

const findUserById = async (req, res) => {
    const id = req.params.id;
    const user = await usersDao.findUserById(id);
    res.json(user);
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const status = await usersDao.deleteUser(id);
    res.json(status);
};  

const updateUser = async (req, res) => {
    const id = req.params.id;
    const status = await usersDao.updateUser(id, req.body);
    const user = await usersDao.findUserById(id);
    req.session["currentUser"] = user;
    res.json(status);
};  

export default UserController
import usersModel from "./users-model.js"
import users from "./users.js";

// let users = [];

// export const findAllUsers = () => users;

export const findAllUsers = () =>
    usersModel.find();

// Find by ID
export const findUserById = (id) =>
    usersModel.findById(id);

    // const index = users.findIndex((u) => u._id === uid);
    // if (index !== -1) return users[index];
    // return null;

// Find by Username
export const findUserByUsername = (username) =>
    usersModel.findOne({username});

    // const index = users.findIndex((u) => u.username === username);
    // if (index !== -1) return users[index];
    // return null;

// Find by Credentials
export const findUserByCredentials = (username, password) =>

    usersModel.findOne({ username, password });

    // const index = users.findIndex((u) => u.username === username && u.password === password);
    // if (index !== -1) return users[index];
    // return null;

// Create User
export const createUser = (user) =>
    usersModel.create(user);

//users.push(user);

// Update User
export const updateUser = (id, user) =>
    usersModel.updateOne({ _id: id }, { $set: user });

    // const index = users.findIndex((u) => u._id === uid);
    // users[index] = { ...users[index], ...user };
    // return {status: 'ok'}

// Delete User
export const deleteUser = (id) =>

    usersModel.deleteOne({ _id: id });

    // const index = users.findIndex((u) => u._id === uid);
    // users.splice(index, 1);
    // return {status: 'ok'}
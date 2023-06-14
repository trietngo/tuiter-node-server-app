let users = [];

export const findAllUsers = () => users;

// Find by ID
export const findUserById = (uid) => {
    const index = users.findIndex((u) => u._id === uid);
    if (index !== -1) return users[index];
    return null;
};

// Find by Username
export const findUserByUsername = (username) => {
    const index = users.findIndex((u) => u.username === username);
    if (index !== -1) return users[index];
    return null;
};

// Find by Credentials
export const findUserByCredentials = (username, password) => {
    const index = users.findIndex((u) => u.username === username && u.password === password);
    if (index !== -1) return users[index];
    return null;
};

// Create User
export const createUser = (user) => users.push(user);

// Update User
export const updateUser = (uid, user) => {
    const index = users.findIndex((u) => u._id === uid);
    users[index] = { ...users[index], ...user };
    return {status: 'ok'}
};

// Delete User
export const deleteUser = (uid) => {
    const index = users.findIndex((u) => u._id === uid);
    users.splice(index, 1);
    return {status: 'ok'}
};
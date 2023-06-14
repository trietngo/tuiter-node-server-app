import people from './users.js'

let users = people
const UserController = (app) => {
    app.get('/api/users', findUsers)
    app.get('/api/users/:uid', findUserById)
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const createUser = (req, res) => {
    const newUser = req.body;
    newUser._id = (new Date()).getTime() + '';
    users.push(newUser);
    res.json(newUser);
}

const findUsers = (req, res) => {
    const type = req.query.type

    if (type) {
        const usersOfType = users.filter(u => u.type === type)

        res.json(usersOfType)

        return
    }

    res.json(users)
}

const findUserById = (req, res) => {
    const userId = req.params.uid;
    const user = users.find(u => u._id === userId);
    res.json(user)
}

const deleteUser = (req, res) => {
    const userId = req.params['uid'];
    users = users.filter(usr => usr._id !== userId);
    res.sendStatus(200);
}

const updateUser = (req, res) => { // handle PUT /api/users/:uid

    const userId = req.params['uid']; // get user ID from path

    const updates = req.body // BODY includes updated fields

    users = users.map((usr) => // create a new array of users
    
    usr._id === userId ? // if current user's ID matches ID we want to update

    {...usr, ...updates} : // merge old usr with new updates
    
    usr); // otherwise keep the old user

    res.sendStatus(200); //return OK

}

export default UserController
import * as tuitsDao from "./tuits-dao.js";

const createTuit = async (req, res) => {
    const newTuit = req.body; // Retrieve data from HTTP body
    // ID is created by database instead

    newTuit.likes = 0; // initialize likes counter

    newTuit.liked = false; // initialize liked flag

    const insertedTuit = await tuitsDao.createTuit(newTuit); // actual tuit inserted in database with DAO's createTuit


    res.json(insertedTuit); // respond with actual inserted tuit

}

const findTuits = async (req, res) => { // async
    const tuits = await tuitsDao.findTuits(); // retrieve tuit from database
    res.json(tuits);
}
    

const updateTuit = async (req, res) => {
    const tuitdIdToUpdate = req.params.tid; // get tuit ID to update from path

    const updates = req.body // get updates from HTTP body, BODY includes updated fields

    const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updates); // status reports success or failure to update document in database

    res.json(status); //respond with status object
}

const deleteTuit = async (req, res) => {
    const tuidIdToDelete = req.params.tid; // retrieve the ID of the tuit we want to remove
    const status = await tuitsDao.deleteTuit(tuidIdToDelete); // success/failure status deleting record from database
    res.json(status); // respond with status object
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
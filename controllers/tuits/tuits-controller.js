import posts from "./tuits.js";
let tuits = posts;

const createTuit = (req, res) => {
    const newTuit = req.body; // Retrieve data from HTTP body
    newTuit._id = (new Date()).getTime() + ''; // add _id field as a time stamp

    newTuit.likes = 0; // initialize likes counter

    newTuit.liked = false; // initialize liked flag

    tuits.push(newTuit); // append new tuit to tuits array

    res.json(newTuit); // respond with new tuit

}

const findTuits = (req, res) => 
    res.json(tuits);

const updateTuit = (req, res) => {
    const tuitdId = req.params.tid; // get tuit ID to update from path

    const updates = req.body // get updates from HTTP body, BODY includes updated fields

    const tuitIndex = tuits.findIndex((t) => t._id === tuitdId) // find index of tuit to update in the tuits array

    tuits[tuitIndex] = {...tuits[tuitIndex], ...updates}; // update the element in tuits array merging old tuit with updates

    res.sendStatus(200); //return OK
}

const deleteTuit = (req, res) => {
    const tuidIdToDelete = req.params.tid; // retrieve the ID of the tuit we want to remove
    tuits = tuits.filter((t) => t._id !== tuidIdToDelete); // filter out the tuit from the tuits array
    res.sendStatus(200); // respond with success
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
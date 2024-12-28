//This should be your entry point, where you set up your Express app and middleware
import express from 'express';
import mongoose from 'mongoose';
import db from './config/connection';
//include all controllers here
import { createUser } from './controllers/userController';
//include all models here
import { User } from './models';

const PORT = process.env.PORT || 3001;
const app = express();

//Middleware to parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Add friend 
app.post('/friends', (req, res) => {
    
})
//Remove friend

//Find all users
app.get('/users', async (_req, res) => {
    try {
        const result = await User.find({});
        res.status(200).json(result);
    } catch(err) {
        res.status(500).send({ message: 'Internal server error.' })
    }
});

//Find all users by id

//Update user

//Create user
app.post('/users', createUser);

//Create second user

//Create third user

//Remove user

//Add reaction

//Remove reaction

//Add comment

//Remove comment

//Start the server
db().then((db) => {
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log('API server running on ${PORT}!');
        });
    });
}).catch((error) => {
    console.error('Failed to connect to DB.', error);
});

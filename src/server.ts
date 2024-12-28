import express from 'express';
import db from './config/connection';
//require model in line below
import { User } from './models';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//add an app.get for the model(s)
app.get('/users', async(_req, res) => {
    try {
        const result = await User.find({});
        res.status(200).json(result);
    } catch(err) {
        res.status(500).send({ message: 'Internal server error.' })
    }
});

db().then((db) => {
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log('API server running on ${PORT}!');
        });
    });
}).catch((error) => {
    console.error('Failed to connect to DB.', error);
});

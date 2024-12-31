//This should be your entry point, where you set up your Express app and middleware
import express from "express";
import mongoose from "mongoose";
import db from "./config/connection";
//include all controllers here
import {
	createUser,
	updateUser,
	deleteUser,
	getUserById,
} from "./controllers/userController";
import {
	createThought,
	updateSingleThought,
	addReaction,
	deleteReaction,
	deleteThought,
} from "./controllers/thoughtController";
//include all models here
import { User } from "./models";
import thoughtsRoutes from "./routes/api/thoughtsRoutes";

const PORT = process.env.PORT || 3001;
const app = express();

//Middleware to parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Find all users
app.get("/users", async (_req, res) => {
	try {
		const result = await User.find({});
		res.status(200).json(result);
	} catch (err) {
		res.status(500).send({ message: "Internal server error." });
	}
});

//Find all users by id
app.get("/users/:userId", getUserById);

//Update user
app.put("/user/:userId", updateUser);

//Create user
app.post("/user", createUser);

//Remove user
app.delete("/user/:userId", deleteUser);

//Add reaction
app.post("/reaction/:reactionId", addReaction);

//Remove reaction
app.delete("/reaction/:reactionId", deleteReaction);

//Add thought
app.post("/thought", addThought);

//Remove thought
app.delete("/thought/:thoughtId", deleteThought);

//Thoughts routes
app.use("/api/thoughts", thoughtsRoutes);

//Start the server
db()
	.then((db) => {
		db.once("open", () => {
			app.listen(PORT, () => {
				console.log("API server running on ${PORT}!");
			});
		});
	})
	.catch((error) => {
		console.error("Failed to connect to DB.", error);
	});

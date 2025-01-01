import { Router } from "express";
import {
	getAllThoughts,
	getSingleThoughtById,
	createThought,
	updateSingleThought,
	deleteThought,
	addReaction,
	deleteReaction,
} from "../../controllers/thoughtController";

const thoughtsRoutes = Router();

// Route to create thought and get all thoughts
thoughtsRoutes.route("/").get(getAllThoughts).post(createThought);

// Route to get a single thought, and update or delete it (api/thoughts/:thoughtId)
thoughtsRoutes
	.route("/:thoughtId")
	.get(getSingleThoughtById)
	.put(updateSingleThought)
	.delete(deleteThought);

// Route to add or remove a reaction (api/thoughts/:thoughtId/reactions)
thoughtsRoutes
	.route("/:thoughtId/reactions")
	.post(addReaction)
	.delete(deleteReaction);

export { thoughtsRoutes };

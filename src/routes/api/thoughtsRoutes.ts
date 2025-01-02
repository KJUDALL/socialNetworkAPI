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

// Route to add a reaction to a thought (api/thoughts/:thoughtId/reactions)
thoughtsRoutes.route("/:thoughtId/reactions").post(addReaction);

//Route to remove reaction from a thought (api/thoughts/:thoughtId/reactions/:reactionId)
thoughtsRoutes
	.route("/:thoughtId/reactions/:reactionId")
	.delete(deleteReaction);

export { thoughtsRoutes };

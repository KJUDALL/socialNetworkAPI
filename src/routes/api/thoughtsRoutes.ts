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

const router = Router();

// api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// api/thoughts/:thoughtId
router
	.route("/:thoughtId")
	.get(getSingleThoughtById)
	.put(updateSingleThought)
	.delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);

export default router;

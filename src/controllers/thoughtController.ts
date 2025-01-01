//should contain the logic for handling requests related to those resources
import { Request, Response } from "express";
import { Types } from "mongoose";
import { Thought } from "../models/Thought";
import User from "../models/User";
import { IReaction } from "../models/Thought";

//Create new thought (post)
export const createThought = async (req: Request, res: Response) => {
	try {
		const { thoughtText, username, userId } = req.body;
		const newThought = await Thought.create({ thoughtText, username });

		//Push created thought _id to associated user's thoughts array field
		await User.findByIdAndUpdate(userId, {
			$push: { thoughts: newThought._id },
		});

		res.status(201).json(newThought);
	} catch (error) {
		res.status(400).json("Failed to create new thought.");
	}
};

//Get all thoughts
export const getAllThoughts = async (
	_req: Request,
	res: Response
): Promise<void> => {
	try {
		const thoughts = await Thought.find();
		res.status(200).json(thoughts);
	} catch (error) {
		res.status(400).json("Failed to get all thoughts.");
	}
};

//Get single thought by its _id
export const getSingleThoughtById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { thoughtId } = req.params;
		const thought = await Thought.findById(thoughtId);

		if (!thought) {
			res.status(400).json("No thought found.");
			return;
		}

		res.status(200).json(thought);
	} catch (error) {
		res.status(400).json("Failed to get single thought.");
	}
};

//Update thought by its _id (post)
export const updateSingleThought = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { thoughtId } = req.params;
		const updatedThought = await Thought.findByIdAndUpdate(
			thoughtId,
			req.body,
			{ new: true }
		);

		if (!updatedThought) {
			res.status(400).json("No thought found.");
			return;
		}

		res.status(200).json(updatedThought);
	} catch (error) {
		res.status(400).json("Failed to updated thought.");
	}
};

//Delete thought by its _id
export const deleteThought = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { thoughtId } = req.params;
		const deletedThought = await Thought.findByIdAndDelete(thoughtId);

		if (!deletedThought) {
			res.status(400).json("No thought found.");
			return;
		}
		// Remove thought's _id from associated user's thoughts array
		await User.findByIdAndUpdate(deletedThought.username, {
			$pull: { thoughts: thoughtId },
		});

		res.status(200).json("Thought deleted!");
	} catch (error) {
		res.status(400).json("Failed to delete thought.");
	}
};

//Add reaction to a thought
export const addReaction = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { thoughtId } = req.params;
		const { reactionBody, username } = req.body;
		const thought = await Thought.findById(thoughtId);

		if (!thought) {
			res.status(404).json("No thought found.");
			return;
		}

		const newReaction: IReaction = {
			reactionId: new Types.ObjectId(),
			reactionBody,
			username,
			createdAt: new Date(),
		};

		thought.reactions.push(newReaction);
		await thought.save();

		res.status(200).json("Reaction added!");
	} catch (error) {
		res.status(404).json("Failed to add reaction.");
	}
};

//Delete reaction by reactionId value
export const deleteReaction = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { thoughtId, reactionId } = req.params;
		const thought = await Thought.findById(thoughtId);

		if (!thought) {
			res.status(400).json("No thought found to remove reaction.");
			return;
		}

		const reactionIndex = thought.reactions.findIndex(
			(reaction: IReaction) => reaction.reactionId.toString() === reactionId
		);
		if (reactionIndex === -1) {
			res.status(400).json("No reaction found.");
		}

		thought.reactions.splice(reactionIndex, 1);
		await thought.save();

		res.status(200).json("Reaction deleted!");
	} catch (error) {
		res.status(400).json("Failed to delete reaction.");
	}
};

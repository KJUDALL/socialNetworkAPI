//should contain the logic for handling requests related to those resources
import { Request, Response } from "express";
import { User } from "../models";

//Create new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, email } = req.body;
		const newUser = await User.create({ username, email });
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json("Failed to create new user.");
	}
};

//Update User
export const updateUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { userId } = req.params;
		const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
			new: true,
		});
		if (!updatedUser) {
			return res.status(400).json("User not found.");
		}
		return res.status(200).json(updatedUser);
	} catch (error) {
		return res.status(400).json("Could not update user.");
	}
};

//Delete User
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { userId } = req.params;
		const deletedUser = await User.findByIdAndDelete(userId);
		if (!deletedUser) {
			return res.status(400).json("No user found.");
		}
		return res.status(200).json("User deleted successfully!");
	} catch (error) {
		return res.status(400).json("Could not delete user.");
	}
};

//Get all users
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
	try {
		const users = await User.find({});
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json("Failed to get all users.");
	}
};

//Get single user by Id
export const getSingleUserByID = async (req: Request, res: Response): Promise<void> => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json("No user found.");
		}
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json("Could not find individual user.");
	}
};

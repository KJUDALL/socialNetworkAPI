//should contain the logic for handling requests related to those resources
import { Request, Response } from "express";
import { User } from "../models";

export const createUser = async (req: Request, res: Response) => {
	try {
		const { username, email } = req.body;
		const newUser = await User.create({ username, email });
	} catch (error) {
		res.status(400).json('Failed to create new user.');
	}
};

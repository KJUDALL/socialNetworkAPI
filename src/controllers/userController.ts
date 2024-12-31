//should contain the logic for handling requests related to those resources
import { Request, Response } from "express";
import { User } from "../models";

//Create new user
export const createUser = async (req: Request, res: Response) => {
	try {
		const { username, email } = req.body;
		const newUser = await User.create({ username, email });
	} catch (error) {
		res.status(400).json('Failed to create new user.');
	}
};

//Update User
export const updateUser = async (req: Request, res: Response) => {
	try {
		const 
	}
}

//Delete User 


//Get all users


//Get single user by Id


//Add friend


//Remove friend

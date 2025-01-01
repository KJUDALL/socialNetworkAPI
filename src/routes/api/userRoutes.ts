import { Router } from "express";
import {
	createUser,
	updateUser,
	deleteUser,
	getAllUsers,
	getSingleUserByID,
} from "../../controllers/userController";

const userRoutes = Router();

// Route to create user and get all users
userRoutes.route("/").get(getAllUsers).post(createUser);

// Route to get, update and delete a single user by _id
userRoutes
	.route("/:userId")
	.get(getSingleUserByID)
	.put(updateUser)
	.delete(deleteUser);

export default userRoutes;

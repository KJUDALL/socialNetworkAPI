import { User, Thought } from "../models/index";
import { connectToDb } from ".";

//remove existing data
const cleanDB = async (): Promise<void> => {
	try {
		await connectToDb();
		await User.deleteMany({});
		console.log("User collection deleted.");

		await Thought.deleteMany({});
		console.log("Thought collection deleted.");
	} catch (err) {
		console.error("Error cleaning up DB collections.", err);
		process.exit(1);
	}
};

cleanDB();

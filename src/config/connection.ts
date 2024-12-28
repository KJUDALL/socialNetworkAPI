//sets up MongoDB connection. Connect to DB
import mongoose from "mongoose";

const db = async (): Promise<typeof mongoose.connection> => {
	try {
		await mongoose.connect(
			process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkAPI"
		);
		console.log("Successful connection to DB.");
		return mongoose.connection;
	} catch (error) {
		console.error("Error: unsuccessful DB connection.");
		throw new Error("DB connection failed.");
	}
};

export default db;

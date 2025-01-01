import mongoose from "mongoose";

const connectToDb = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/socialNetworkAPI");
		console.log("Connected to DB successfully!");
	} catch (err) {
		console.error("Failed to connect to DB.", err);
	}
};

export { connectToDb };

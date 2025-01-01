//Ensure your data.ts file contains the logic to populate your database
import { User, Thought } from "../models";
import { connectToDb } from ".";

const seedData = async () => {
	try {
		await connectToDb();

		//seed users
		const users = await User.create([
			{ username: "johnDoe", email: "johndoe@example.com" },
			{ username: "janeSmith", email: "janesmith@example.com" },
		]);
		console.log("User data seeded successfully!");

		//seed thoughts
		await Thought.create([
			{
				thoughtText: "First test thought!",
				username: users[0].username,
				reactions: [
					{ reactionBody: "This is awesome!", username: users[1].username },
				],
			},
			{
				thoughtText: "Happy to be here folks!",
				username: users[1].username,
				reactions: [{ reactionBody: "Welcome!", username: users[0].username }],
			},
		]);
		console.log("Thought data seeded successfully!");
	} catch (err) {
		console.error("Could not seed data.", err);
		process.exit(1);
	}
};

seedData();

//This should be your entry point, where you set up your Express app and middleware
import express, { Request, Response, NextFunction } from "express";
import db from "./config/connection";
import { thoughtsRoutes } from "./routes/api/thoughtsRoutes";
import { userRoutes } from "./routes/api/userRoutes";

const PORT = process.env.PORT || 3001;
const app = express();

//Middleware to parse json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Error handling in middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction): void => {
	console.error(err.stack);
	res.status(500).json("Uh-oh something went wrong!");
});

//API Routes
app.use("/api/thoughts", thoughtsRoutes);
app.use("/api/users", userRoutes);

//Connect to DB, Start the server
db()
	.then(() => {
		console.log("Database connection successful.");
		app.listen(PORT, () => {
			console.log(`API server running on ${PORT}!`);
		});
	})
	.catch((err) => {
		console.error("Failed to connect to DB.", err);
	});

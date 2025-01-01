//Make sure that index.ts in the routes folder exports all the routes for easy importing in your server.ts
import { Router } from "express";
import { thoughtsRoutes } from "./thoughtsRoutes";
import { userRoutes } from "./userRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/thoughts", thoughtsRoutes);

export { router };
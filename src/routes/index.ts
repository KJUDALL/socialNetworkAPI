import { Router } from "express";
import { thoughtsRoutes } from "./api/thoughtsRoutes";
import { userRoutes } from "./api/userRoutes";

const router = Router();

router.use("/api", thoughtsRoutes);
router.use("/api", userRoutes);

export { router };

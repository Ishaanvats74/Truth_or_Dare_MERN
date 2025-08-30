import express from "express";
import { customGame, startGame } from "../controllers/gameController.js";

const router = express.Router();

router.post("/startGame", startGame);
router.post("/customGame/:gameId", customGame);

export default router;

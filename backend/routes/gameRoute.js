import express from "express";
import { startGame } from "../controllers/gameController";


const router = express.Router();
router.post("/startGame",startGame);

export default router;
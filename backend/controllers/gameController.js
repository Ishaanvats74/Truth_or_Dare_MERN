import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Game } from "../models/Game.js";

export const startGame = catchAsyncError(async (req,res,next) => {
    try {
        if (game == "single") {
            const {players,questionTypeFrom,questionType } = req.body;
            if (!players || players.length < 2){
                return next(new ErrorHandler("At least 2 Player are required",400));
            }
            const randomTurn = Math.floor[Math.random() * players.length]
            const game = new Game({
                names:players,
                questionTypeFrom,
                questionType,
                currentTurn:randomTurn,
                history:[],
            });
            await game.save();
            res.json({ success: true, game });
        }
    } catch (error) {
        next(error);
    };
});
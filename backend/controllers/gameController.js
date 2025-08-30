import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Game } from "../models/Game.js";

export const startGame = catchAsyncError(async (req, res, next) => {
  try {
    const { names, questionTypeFrom, questionType } = req.body;
    if (!names || names.length < 2) {
      return next(new ErrorHandler("At least 2 Player are required", 400));
    }
    const game = await Game.create({
      names: names,
      questionTypeFrom: questionTypeFrom || "inbuilt",
      history: [],
    });
    res.status(200).json({
      success: true,
      message: "Game started successfully",
      gameId: game._id,
      players: game.names,
    });
  } catch (error) {
    next(error);
  }
});

export const customGame = catchAsyncError(async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const { currentPlayer,questionType } = req.body;
    const game = await Game.findById(gameId);
    if (!game) return next(new ErrorHandler("Game not found", 404));
    console.log(questionType)
    let result;
    if (game.questionTypeFrom === "ai") {
      result = await game.AiQuestion(questionType);
    } else {
      result = await game.InbuiltQuestion(questionType);
    }

    game.history.push({
      player: currentPlayer,
      type: questionType,
      question: result.question,
    });

    await game.save();

    res.status(200).json({
      success: true,
      player: currentPlayer,
      type: result.questionType,
      question: result.question,
    });
  } catch (error) {
    next(error);
  }
});

import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Game } from "../models/Game.js";

export const startGame = catchAsyncError(async (req, res, next) => {
  try {
    const { names } = req.body;
    if (!names || names.length < 2) {
      return next(new ErrorHandler("At least 2 Player are required", 400));
    }
    const game = await Game.create({
      names: names,
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
    const { currentPlayer, questionType, userPrompt = "", questionTypeFrom = "inbuilt" } = req.body;
    const game = await Game.findById(gameId);
    if (!game) return next(new ErrorHandler("Game not found", 404));

    let result;
    let questionText;
    if (questionTypeFrom === "ai") {
      result = await game.AiQuestion(questionType, userPrompt);
      questionText = result.text;
    } else {
      result = await game.InbuiltQuestion(questionType);
      questionText = result.question;
    }

    game.history.push({
      player: currentPlayer,
      type: questionType,
      question: questionText,
      questionTypeFrom,
      aiPrompt:  userPrompt,
    });

    await game.save();

    res.status(200).json({
      success: true,
      player: currentPlayer,
      type: result.type,
      question: questionText,
    });
  } catch (error) {
    next(error);
  }
});


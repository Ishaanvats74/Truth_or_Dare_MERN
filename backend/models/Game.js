import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GameSchema = new mongoose.Schema({
  names: {
    type: [String],
    required: true,
  },

  currentTurn: {
    type: Number,
    default: 0,
  },
  history: [
    {
      questionTypeFrom: {
        type: String,
        enum: ["ai", "inbuilt"],
      },
      player: String,
      type: { type: String, enum: ["truth", "dare"] },
      question: String,
      answered: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
      questionType: {
        type: String,
        enum: ["truth", "dare", "random"],
        default: "random",
      },
      aiPrompt:{type: [String]},
      aiHistory:{type: [String]},
      isAi: {
        type: Boolean,
        default: false,
      },
    },
  ],
  status: {
    type: String,
    enum: ["waiting", "in-progress", "finished"],
    default: "waiting",
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  }
});

GameSchema.methods.AiQuestion = async function (questionType,prompt="") {
  let type = questionType;
  let userPrompt = prompt;
  const API_KEY = process.env.GEMINI_API_KEY;
   if (!API_KEY) {
    throw new Error("GEMINI_API_KEY not found in environment variables");
  }
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const truthQuestion = async (userPrompt) => {
    const Given =
      `Give any truth question which we can ask just give one question anything more should be under 15 words or max 20 words, It should be different from this history question and Prompt ${this.history.map(h => h.aiHistory && h.aiPrompt || [])}`;
    const usersPrompt = userPrompt;
    const prompt = Given.concat(usersPrompt);
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    this.history.push({
      aiHistory:text
    })
    await this.save();

    
    return text;
  }
  const dareQuestion = async (userPrompt) =>{
    const Given =
      `Give any dare question which we can ask just give one question anything more should be under 15 words or max 20 words, It should be different from this history question and Prompt ${this.history.map(h => h.aiHistory && h.aiPrompt  || [])}`;
    const usersPrompt = userPrompt;
    const prompt = Given.concat(usersPrompt);
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  }
  let text;
  if (type == "truth") {
    text = await truthQuestion(userPrompt);
  } else if (type == "dare") {
    text = await dareQuestion(userPrompt);
  } else {
    type = Math.random() < 0.5 ? "truth" : "dare";
    if (type == "truth") {
      text = await truthQuestion(userPrompt);
    } else {
      text = await dareQuestion(userPrompt);
    }
  }

  return { type, text };
};

GameSchema.methods.InbuiltQuestion = async function (questionType) {
  const truthQuestion = [
    "What’s the most embarrassing thing you’ve ever done in public?",
    "Who was your first crush?",
    "Have you ever lied to get out of trouble?",
    "What’s the biggest secret you’ve kept from your parents?",
    "What’s the worst excuse you’ve ever used?",
    "If you could switch lives with someone here, who would it be and why?",
    "What’s one habit you wish you could get rid of?",
    "Have you ever cheated in a game or exam?",
    "Who in this room do you trust the most (or least)?",
    "What’s the silliest thing you’re afraid of?",
  ];
  const dareQuestion = [
    "Do 15 jumping jacks right now.",
    "Sing the chorus of your favorite song loudly.",
    "Talk in a funny accent for the next 3 rounds.",
    "Do an impression of any celebrity until someone guesses who it is.",
    "Try to balance a book on your head for 1 minute.",
    "Dance without music for 30 seconds.",
    "Post a funny selfie (or pretend if offline).",
    "Pretend to be a waiter/waitress and take everyone’s “order”.",
    "Eat something weird (like ketchup with bread, or mix two snacks).",
    "Let the person to your left draw something on your hand with a pen.",
  ];


let type = questionType;

  let question;

  if (type == "truth") {
    question = truthQuestion[Math.floor(Math.random() * truthQuestion.length)];
  } else if (type == "dare") {
    question = dareQuestion[Math.floor(Math.random() * dareQuestion.length)];
  } else {
    type = Math.random() < 0.5 ? "truth" : "dare";
    if (type == "truth") {
      question =
        truthQuestion[Math.floor(Math.random() * truthQuestion.length)];
    } else {
      question = dareQuestion[Math.floor(Math.random() * dareQuestion.length)];
    }
  }
  return { type, question };
};

export const Game = mongoose.model("GameType", GameSchema);

import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  names: {
    type: [String],
    required: true,
  },

  questionType: {
    type: String,
    enum: ["truth", "dare", "random", "ai", "inbuilt"],
    default: "random",
  },

  currentTurn: {
    type: Number,
    default: 0,
  },

  history: [
    {
      player: String,
      type: { type: String, enum: ["truth", "dare"] },
      question: String,
      answered: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  isAi: {
    type: Boolean,
    default: false,
  },

  status: {
    type: String,
    enum: ["waiting", "in-progress", "finished"],
    default: "waiting",
  },

  Created_at: {
    type: Date,
    default: Date.now,
  },
});

GameSchema.methods.AiQuestion = async function (params) {};

GameSchema.methods.InbuiltQuestion = async function () {
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

  let type = this.questionType;
  let question;

  if (type == "truth") {
    question = truthQuestion[Math.floor(Math.random() * truthQuestion.length)];
  } else if (type == "dare") {
    question = dareQuestion[Math.floor(Math.random() * dareQuestion.length)];
  } else {
    type = Math.random() < 0.5 ? "truth" : "dare";
    if (type == "truth") {
      question = truthQuestion[Math.floor(Math.random() * truthQuestion.length)];
    } else {
      question = dareQuestion[Math.floor(Math.random() * dareQuestion.length)];
    }
  }
  console.log(type);
  console.log(question);
  return type, question;
};

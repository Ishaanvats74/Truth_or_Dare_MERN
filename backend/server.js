import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
config({ path: "./config.env" });

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

dbConnection();
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
  console.log(
    `visit This site for backend server http://localhost${process.env.PORT}`
  );
});

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import App from "./App.jsx";
import CustomGame from "./pages/CustomGame.jsx"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
   
  </StrictMode>
);

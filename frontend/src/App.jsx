import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CustomGame from "./pages/CustomGame";
import Home from "./pages/Home";
import axios from "axios";
import { useEffect } from "react";
import StartGame from "./pages/StartGame";

function App() {
  useEffect(() => {
    const getUser = async () => {
      await axios.get("http://localhost:4000"), { withCredentials: true };
    };
    getUser();
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/CustomGame" element={<CustomGame />} />
          <Route path="/pages/StartGame" element={<StartGame />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

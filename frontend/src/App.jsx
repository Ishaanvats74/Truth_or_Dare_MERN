import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CustomGame from "./pages/CustomGame";
import Home from "./pages/Home";
import StartGame from "./pages/StartGame";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CustomGame" element={<CustomGame />} />
          <Route path="/StartGame" element={<StartGame />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

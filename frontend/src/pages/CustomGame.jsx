import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomGame = () => {
  const [names, setNames] = useState([]);
  const [name, setName] = useState("");
  const [startButton, setStartButton] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setNames([...names, name]);
    setName("");
    if (names.length >= 1) {
      console.log("hello");
      setStartButton(true);
    }
  };

  const handleEnter = (e) => {
    if (name.trim() == "") {
      return;
    }
    if (e.key == "Enter") {
      handleSubmit(e);
    }
  };

  const handleRemove = (item) => {
    const updatedNames = names.filter((n) => n !== item);
    setNames(updatedNames);
  };

  const handleStartGame = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/game/startGame", {
        names,
        questionTypeFrom: "inbuilt",
        questionType: "random",
      });
      localStorage.setItem("gameId", res.data.gameId);
      localStorage.setItem("players", JSON.stringify(res.data.players));
      navigate("/StartGame");
    } catch (error) {
      console.error(error);
      alert("Failed to start game");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
      <div className="flex flex-col gap-3 mb-6 bg-white/10 p-10 rounded-2xl justify-center items-center w-96">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="Enter a name..."
          className="px-4 py-2  rounded-xl border w-full bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          onClick={handleSubmit}
          disabled={name.trim() == ""}
          className="px-5 py-2 bg-blue-600 text-white w-full rounded-xl shadow hover:bg-blue-700 transition"
        >
          Submit
        </button>
        {startButton && (
          <div
            onClick={handleStartGame}
            className="px-5 py-2 bg-green-600 text-center text-white w-full rounded-xl shadow hover:bg-green-700 transition"
          >
            Start Game
          </div>
        )}
      </div>

      <div className="w-full max-w-sm space-y-4">
        {names.map((item, index) => (
          <div
            key={index}
            className="bg-black px-4 py-2 rounded-lg shadow border border-gray-200 flex justify-between items-center"
          >
            <div className="text-xl text-white">{item}</div>
            <button
              onClick={() => handleRemove(item)}
              className="bg-red-400 hover:bg-red-600 text-white transition ease-in-out duration-200 p-2 rounded-xl"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomGame;

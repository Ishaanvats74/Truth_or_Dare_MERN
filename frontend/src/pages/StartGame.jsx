import { useState } from "react";
import WheelPage from "../components/WheelPage";

const StartGame = () => {
  const [switchMode, setSwitchMode] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const handleAsk = async () => {
    if (switchMode) {
      localStorage.setItem("userPrompt", aiPrompt);
    } else {
      localStorage.removeItem("userPrompt");
    }

    setAiPrompt("");
  };

  return (
    <div className="bg-black h-screen relative">
      <button
        className="text-white absolute top-4 left-4"
        onClick={() => setSwitchMode((prev) => !prev)}
      >
        {switchMode ? "Switch Back To Normal" : "Switch To AI"}
      </button>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <WheelPage switchMode={switchMode} />
      </div>

      {switchMode && (
        <div className="absolute bottom-10 left-10 right-10 flex gap-3  p-3 rounded-lg">
          <input
            type="text"
            placeholder="Type something..."
            className="flex-1 px-3 py-2 rounded-lg border border-gray-400 text-white focus:outline-none"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          />
          <button
            onClick={() => {
              handleAsk();
            }}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition ease-in-out duration-200 cursor-pointer"
          >
            Ask AI
          </button>
        </div>
      )}
    </div>
  );
};

export default StartGame;

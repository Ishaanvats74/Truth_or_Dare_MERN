import axios from "axios";
import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";

const colors = [
  "#FF4C4C",
  "#FF914D",
  "#FFD93D",
  "#4DFF4D",
  "#1AFFD5",
  "#4DA6FF",
  "#914DFF",
  "#FF4DE1",
  "#FF66B2",
  "#00FFCC",
  "#FF9933",
  "#33FF57",
  "#FF1493",
  "#00CED1",
  "#FF7F50",
  "#7FFF00",
  "#FF4500",
  "#1E90FF",
  "#ADFF2F",
  "#FF00FF",
  "#00FF7F",
  "#FFD700",
  "#FF69B4",
  "#40E0D0",
  "#BA55D3",
  "#00BFFF",
];

const WheelPage = () => {
  const [names, setNames] = useState([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [showPlayerName, setShowPlayerName] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const gameId = localStorage.getItem("gameId");
    if (gameId) {
      console.log(gameId);
    } else {
      console.log("No gameId found!");
      return;
    }
    const players = JSON.parse(localStorage.getItem("players"));
    if (Array.isArray(players)) {
      setNames(players);
    } else {
      setNames([]);
    }
  }, []);

  const handleSpinClick = () => {
    if (names.length === 0) return;
    if (!mustSpin) {
      setShowPlayerName(false);
      const PlayerNumber = Math.floor(Math.random() * names.length);
      setPlayerNumber(PlayerNumber);
      setMustSpin(true);
    }
  };

  const handleWheelStop = () => {
    setPlayerName(names[playerNumber]);
    setShowPlayerName(true);
  };

  const fetchQuestion = async (questionType) => {
    try {
      console.log(questionType);
      const gameId = localStorage.getItem("gameId");
      console.log(gameId);
      if (!gameId) return;
      const res = await axios.post(
        `http://localhost:4000/api/game/customGame/${gameId}`,
        {
          currentPlayer: playerName,
          questionType,
        }
      );
      setQuestion(res.data.question);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center md:space-x-5 space-y-3">
        {names.length > 0 && (
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={playerNumber}
            data={names.map((n) => ({ option: n }))}
            backgroundColors={colors}
            outerBorderColor="transparent"
            outerBorderWidth={0}
            radiusLineColor="transparent"
            textColors={["white"]}
            onStopSpinning={() => {
              setMustSpin(false);
              handleWheelStop();
            }}
          />
        )}
        <button
          onClick={handleSpinClick}
          className="px-5 py-2 bg-green-600  text-center text-white  rounded-xl shadow hover:bg-green-700 transition"
        >
          SPIN
        </button>
      </div>
      <div>
        {showPlayerName && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-black rounded-2xl p-8 w-96 text-center space-y-6 shadow-2xl">
              <p className="text-4xl text-white font-bold mt-4">
                {playerName} will choose
              </p>
              <p className="text-white text-2xl">Choose: Truth or Dare</p>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchQuestion("truth")}
                  className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition w-full"
                >
                  Truth
                </button>
                <button
                  onClick={() => fetchQuestion("dare")}
                  className="px-6 py-3 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition w-full"
                >
                  Dare
                </button>
              </div>

              {question && (
                <div className="space-y-3">
                  <div className="mt-4 text-white text-lg">
                    Question: {question}
                  </div>
                  <div
                    onClick={() => {
                      setQuestion(null);
                      setShowPlayerName(false);
                    }}
                    className="px-5 py-2 bg-green-600  text-center text-white  rounded-xl shadow hover:bg-green-700 transition"
                  >
                    Spin again
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WheelPage;

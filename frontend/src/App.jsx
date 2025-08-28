import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function App() {
  const [startGame, setStartGame] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      await axios.get("http://localhost:4000"), { withCredentials: true };
    };

    getUser();
    if (startGame) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  }, [startGame]);

  const handleStartGame = async () => {
    setStartGame(true);
  };
  const closePopup = () => {
    setStartGame(false);
  };

  const handleCustomGame = () => {
    navigate("/pages/customGame")
  };

  const handleOnlineGame = () => {
    alert("Online Game");
  };
  return (
    <>
      <div className={`flex flex-col bg-black xs:h-auto md:min-h-screen  space-y-16`}>
        <div className={`"flex justify-between px-5 pt-7 "`}>
          <div className="flex items-center text-3xl opacity-40 ">😈</div>
          <div className="flex flex-col items-center animate-bounce font-extrabold font-">
            <p className="text-5xl bg-gradient-to-bl from-blue-400 to-yellow-300 bg-clip-text text-transparent">
              TRUTH
            </p>
            <p className="text-4xl text-white">&</p>
            <p className="text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-300  to-blue-500">
              DARE
            </p>
          </div>
          <div className="flex items-end text-3xl opacity-40">💎</div>
        </div>
        <div className="flex justify-center ">
          <span className="text-xl text-white/70 sm:text-sm sm:px-20 sm:text-center">
            The ultimate party game that brings friends closer together. Are you
            ready to reveal secrets and take on wild challenges?
          </span>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => handleStartGame()}
            className="py-5 bg-gradient-to-r from-blue-400/40 to-white/40  rounded-full px-25 text-3xl text-white/80 font-bold"
          >
            🎯 Start Game
          </button>
        </div>
        <div className=" justify-around grid grid-rows-3 space-y-10 md:flex md:space-x-10 px-5">
          <div className="p-6 bg-white/15 backdrop-blur-lg text-center space-y-4 border-white/40 rounded-2xl border  h-60">
            <div className="text-4xl">🤫</div>
            <div className="font-bold text-2xl text-white">Truth Mode</div>
            <div className="text-white/80">
              Discover secrets and learn suprising facts about your friends
            </div>
          </div>
          <div className="p-6 bg-white/15 backdrop-blur-lg text-center space-y-4 border-white/40 rounded-2xl border  h-60">
            <div className="text-4xl">⚡</div>
            <div className="font-bold  text-white">Dare Mode</div>
            <div className="text-white/80">
              Take on hilarious and exciting changes that push your limits{" "}
            </div>
          </div>
          <div className="p-6 bg-white/15 backdrop-blur-lg text-center space-y-4 border-white/40 rounded-2xl border h-60">
            <div className="text-4xl">🎉</div>
            <div className="font-bold  text-white">Party Ready</div>
            <div className="text-white/80 ">
              Perfect for parties, sleepovers, and breaking the ice with new
              friends
            </div>
          </div>
        </div>
        <footer className="flex justify-center mt-auto text-white/80">
          <div>
            Join millions of players worldwide * No downloads required * Instant
            fun
          </div>
        </footer>
      </div>

      {startGame && (
          <div className="fixed inset-0  bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={closePopup} >
            <div className="bg-black rounded-2xl p-8 w-96 text-center space-y-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-bold text-white">🎉 Let’s Play!</h2>
              <p className="text-white">
                Choose a mode to start: Truth or Dare
              </p>
              <div className="flex justify-around">
                <button
                  className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                  onClick={handleCustomGame}
                >
                  Custom Game
                </button>
                <button
                  className="px-6 py-3 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
                  onClick={handleOnlineGame}
                >
                  Online Game
                </button>
              </div>
              <button
                onClick={closePopup}
                className="mt-4 text-sm text-gray-500 hover:text-white"
              >
                ❌ Close
              </button>
            </div>
          </div>
      )}
    </>
  );
}

export default App;

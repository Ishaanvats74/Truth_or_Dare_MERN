import { useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(()=>{
    const getUser = async () => {
      await axios.get("http://localhost:4000")
    };
    getUser();
  })
  return (
    <>
      <div className="flex flex-col bg-black xs:h-auto md:min-h-screen space-y-16">
        <div className="flex justify-between px-5 pt-7">
          <div className="flex items-center text-3xl opacity-40 ">😈</div>
          <div className="flex flex-col items-center animate-bounce font-extrabold font-">
            <p className="text-5xl bg-gradient-to-bl from-blue-400 to-yellow-300 bg-clip-text text-transparent">TRUTH</p>
            <p className="text-4xl text-white">&</p>
            <p className="text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-300  to-blue-500">DARE</p>
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
          <button className="py-5 bg-gradient-to-r from-blue-400/40 to-white/40  rounded-full px-25 text-3xl text-white/80 font-bold">🎯 Start Game</button>
        </div>
        <div className=" justify-around grid grid-rows-3 space-y-10 md:flex md:space-x-10 px-5">
          <div className="p-6 bg-white/15 backdrop-blur-lg text-center space-y-4 border-white/40 rounded-2xl border  h-60">
            <div className="text-4xl">🤫</div>
            <div className="font-bold text-2xl text-white">Truth Mode</div>
            <div className="text-white/80">Discover secrets and learn suprising facts about your friends</div>
          </div>
          <div className="p-6 bg-white/15 backdrop-blur-lg text-center space-y-4 border-white/40 rounded-2xl border  h-60">
            <div className="text-4xl">⚡</div>
            <div className="font-bold  text-white">Dare Mode</div>
            <div className="text-white/80">Take on hilarious and exciting changes that push your limits </div>
          </div>
          <div className="p-6 bg-white/15 backdrop-blur-lg text-center space-y-4 border-white/40 rounded-2xl border h-60">
            <div className="text-4xl">🎉</div>
            <div className="font-bold  text-white">Party Ready</div>
            <div className="text-white/80 ">Perfect for parties, sleepovers, and breaking the ice with new friends</div>
          </div>
        </div>
        <footer className="flex justify-center mt-auto text-white/80">
          <div>Join millions of players worldwide * No downloads required * Instant fun</div>
        </footer>
      </div>
    </>
  );
}

export default App;

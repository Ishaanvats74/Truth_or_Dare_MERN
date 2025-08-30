import WheelPage from "../components/WheelPage";

const StartGame = () => {
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="flex justify-center items-center space-x-4">
        <WheelPage />
      </div>
    </div>
  );
};

export default StartGame;

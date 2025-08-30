import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const colors = [
  "#FF4C4C","#FF914D","#FFD93D","#4DFF4D",
  "#1AFFD5","#4DA6FF","#914DFF","#FF4DE1",
  "#FF66B2","#00FFCC","#FF9933","#33FF57",
  "#FF1493","#00CED1","#FF7F50","#7FFF00",
  "#FF4500","#1E90FF","#ADFF2F","#FF00FF",
  "#00FF7F","#FFD700","#FF69B4","#40E0D0",
  "#BA55D3","#00BFFF",];

const data = [
  { option: "ishaan" },
  { option: "ria" },
  { option: "roshni " },
  { option: "vineet" },
  { option: "ronak" },
];

const WheelPage = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };
  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={colors}
        outerBorderColor="transparent"
        outerBorderWidth={0}
        radiusLineColor="transparent"
        textColors={["white"]}
        onStopSpinning={() => {
          setMustSpin(false);
          alert(data[prizeNumber]["option"]);
        }}
      />
      <button onClick={handleSpinClick} className="text-white">
        SPIN
      </button>
    </>
  );
};

export default WheelPage;

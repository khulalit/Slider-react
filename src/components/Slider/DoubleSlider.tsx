import React, { useState, useEffect } from "react";
import "./DoubleSlider.css";
import { cssVariables } from "./constants";
import { calculatePercentage } from "./utils";

interface DoubleSliderProps {
  min?: number;
  max?: number;
  steps?: number;
  handleSize: "Size_24" | "Size_32";
  onChange?: ({ left, right }: { left: number; right: number }) => void;
}

const DoubleSlider: React.FC<DoubleSliderProps> = ({
  min = 0,
  max = 100,
  steps,
  handleSize,
  onChange,
}) => {
  const MID = Math.floor((max - min) / 2);
  const [percentageLeft, setPercentageLeft] = useState(
    calculatePercentage(min, min, max)
  );
  const [percentageRight, setPercentageRight] = useState(
    calculatePercentage(max, MID, max)
  );
  const [value, setValue] = useState<{ left: number; right: number }>({
    left: calculatePercentage(min, min, max),
    right: calculatePercentage(120, MID, max),
  });

  const handleInputChangeLeft = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPercentageLeft(calculatePercentage(value, min, MID));
    setValue((prev) => ({ ...prev, left: value }));
  };

  const handleInputChangeRight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPercentageRight(calculatePercentage(value, MID, max));
    setValue((prev) => ({ ...prev, right: value }));
  };

  useEffect(() => {
    onChange && onChange({ left: value.left, right: value.right });
  }, [value, onChange]);

  return (
    <div className="range-slider-double">
      <div className="steps">
        {steps &&
          steps > 2 &&
          new Array(steps)
            .fill("n")
            .map((_, index) => <div key={index} className="step"></div>)}
      </div>
      <input
        type="range"
        min={min}
        max={MID}
        defaultValue={min}
        className={`slider ${handleSize === "Size_24" ? "small" : "large"}`}
        step={steps ? steps / 2 : 0}
        onInput={handleInputChangeLeft}
        style={{
          background: `linear-gradient(
            to right,
            ${cssVariables.trackBgColor} 0%,
            ${cssVariables.trackBgColor} ${percentageLeft}%,
            ${cssVariables.trackColor} ${percentageLeft}%
          )`,
        }}
        id="slider-range-left"
      />
      <input
        type="range"
        min={MID}
        max={max}
        defaultValue={max}
        className={`slider ${handleSize === "Size_24" ? "small" : "large"}`}
        step={steps ? steps / 2 : 0}
        onInput={handleInputChangeRight}
        style={{
          background: `linear-gradient(
            to right,
            ${cssVariables.trackColor} 0%,
            ${cssVariables.trackColor} ${percentageRight}%,
            ${cssVariables.trackBgColor} ${percentageRight}%
          )`,
        }}
        id="slider-range-right"
      />
    </div>
  );
};

export default DoubleSlider;

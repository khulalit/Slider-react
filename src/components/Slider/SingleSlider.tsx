import React, { useState } from "react";
import "./Slider.css";
import "./styles.css";
import { cssVariables } from "./constants";
import { calculatePercentage } from "./utils";

interface SingleSliderProps {
  min?: number;
  max?: number;
  steps?: number;
  defaultValue?: number;
  handleSize: "Size_24" | "Size_32";
  onChange?: (value: number) => void;
}

const SingleSlider: React.FC<SingleSliderProps> = ({
  min = 0,
  max = 100,
  defaultValue = Math.floor((max - min) / 2),
  steps,
  handleSize,
  onChange,
}) => {
  const [percentage, setPercentage] = useState(
    steps ? 0 : calculatePercentage(defaultValue, min, max)
  );
  const [value, setValue] = useState(steps ? 0 : defaultValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPercentage(calculatePercentage(value, min, max));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onChange && onChange(value);
    setValue(value);
  };

  const isStepUnderCover = (step: number) => {
    if (!steps) return false;
    const stepPercentage = (step / steps) * 100;
    return percentage > stepPercentage;
  };

  return (
    <div className="slide-container">
      <div className="steps">
        {steps &&
          steps > 2 &&
          new Array(steps).fill("n").map((_, index) => (
            <div
              key={index}
              className="step"
              style={{
                marginTop: "2px",
                backgroundColor: isStepUnderCover(index)
                  ? "white"
                  : cssVariables.thumbBgColor,
              }}
            ></div>
          ))}
      </div>
      <input
        list="markers"
        type="range"
        min={min}
        max={max}
        defaultValue={defaultValue}
        step={steps || 0}
        className={`slider ${handleSize === "Size_24" ? "small" : "large"}`}
        onInput={handleInputChange}
        onChange={handleOnChange}
        style={{
          background: `linear-gradient(
            to right,
            ${cssVariables.trackColor} 0%,
            ${cssVariables.trackColor} ${percentage}%,
            ${cssVariables.trackBgColor} ${percentage}%
          )`,
        }}
        id="slider-range"
      />
      <div
        className="tooltip"
        style={{
          left:
            percentage > 50
              ? `calc(${percentage}% - ${16 - (percentage % 16)}px)`
              : `calc(${percentage}% + ${16 - (percentage % 16)}px)`,
        }}
      >
        {value}
      </div>
    </div>
  );
};

export default SingleSlider;

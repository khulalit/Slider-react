import { useEffect, useState } from "react";
import "./styles.css";

const cssVariables = {
  trackHeight: "8px",
  thumbSize: "24px",
  thumbBorderSize: "2px",
  thumbColor: "#fff",
  thumbBgColor: "#008000",
  trackColor: "#008000",
  trackBgColor: "#f2f3f5",
  thumbHoverColor: "#edfaed",
};

type SliderType = "Continuous" | "Discreet";
type SliderSubtype = "Single" | "Range";
type HandleSize = "Size_24" | "Size_32";
type SliderPositionFunctionDual = ({
  left,
  right,
}: {
  left: number;
  right: number;
}) => void;
type SliderPositionFunction = (value: number) => void;

export interface SliderProps {
  type: SliderType;
  subtype: SliderSubtype;
  steps?: number;
  handleSize: HandleSize;
  min?: number;
  max?: number;
  onChange?: SliderPositionFunction | SliderPositionFunctionDual;
}

interface SingleSliderProps {
  min?: number;
  max?: number;
  steps?: number;
  defaultValue?: number;
  handleSize: HandleSize;
  onChange?: SliderPositionFunction | SliderPositionFunctionDual;
}

const Slider = ({
  type,
  subtype,
  steps,
  handleSize,
  min,
  max,
  onChange,
}: SliderProps) => {
  if (type === "Continuous") {
    if (subtype === "Range")
      return (
        <DoubleSlider
          handleSize={handleSize}
          min={min}
          max={max}
          onChange={onChange}
        />
      );
    return (
      <SingleSlider
        handleSize={handleSize}
        min={min}
        max={max}
        onChange={onChange}
      />
    );
  } else {
    if (subtype === "Range")
      return (
        <DoubleSlider
          steps={steps}
          handleSize={handleSize}
          min={min}
          max={max}
          onChange={onChange}
        />
      );
    return (
      <SingleSlider
        steps={steps}
        handleSize={handleSize}
        min={min}
        max={max}
        onChange={onChange}
      />
    );
  }
};

const SingleSlider = ({
  min = 0,
  max = 100,
  steps,
  handleSize,
  onChange,
}: SingleSliderProps) => {
  const defaultValue = steps ? (max - min) / steps : min;
  const [percentage, setPercentage] = useState(
    calculatePercentage(defaultValue, min, max)
  );

  const [value, setValue] = useState(defaultValue);

  function calculatePercentage(value: number, min: number, max: number) {
    const interval = max - min;
    return Math.floor(((value - min) / interval) * 100);
  }

  function handleInputChange(e: any) {
    const value = e.target.value;
    setPercentage(calculatePercentage(value, min, max));
  }

  function handleOnchange(e: any) {
    const value = e.target.value;
    if (onChange) onChange(value);
    setValue(value);
  }

  function isStepUnderCover(step: number) {
    if (!steps) return;
    const stepPercentage = (step / steps) * 100;
    return percentage > stepPercentage;
  }

  return (
    <div className="slide-container">
      <div className="steps">
        {steps &&
          steps > 2 &&
          new Array(steps).fill("n").map((value, index) => {
            return (
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
            );
          })}
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
        onChange={handleOnchange}
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

const DoubleSlider = ({
  min = 0,
  max = 100,
  steps,
  handleSize,
  onChange,
}: SingleSliderProps) => {
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

  function calculatePercentage(value: number, min: number, max: number) {
    const interval = max - min;
    return Math.floor(((value - min) / interval) * 100);
  }

  function handleInputChangeLeft(e: any) {
    const value = e.target.value;
    setPercentageLeft(calculatePercentage(value, min, MID));
    console.log(value);
    setValue((prev: any) => {
      return { ...prev, left: value };
    });
  }

  function handleInputChangeRight(e: any) {
    const value = e.target.value;
    setPercentageRight(calculatePercentage(value, MID, max));
    setValue((prev: any) => {
      return { ...prev, right: value };
    });
  }

  useEffect(() => {
    if (onChange)
      (onChange as SliderPositionFunctionDual)({
        left: value.left,
        right: value.right,
      });
  }, [value]);

  return (
    <div className="range-slider-double">
      <div className="steps">
        {steps &&
          steps > 2 &&
          new Array(steps).fill("n").map((value, index) => {
            return <div key={index} className="step"></div>;
          })}
      </div>
      <input
        type="range"
        min={min}
        max={MID}
        defaultValue={min}
        className={`slider ${handleSize === "Size_24" ? "small" : "large"}`}
        onInput={handleInputChangeLeft}
        step={steps ? steps / 2 : 0}
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

export default Slider;

import DoubleSlider from "./DoubleSlider";
import SingleSlider from "./SingleSlider";

type SliderType = "Continuous" | "Discrete";
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

const Slider: React.FC<SliderProps> = ({
  type,
  subtype,
  steps,
  handleSize,
  min,
  max,
  onChange,
}) => {
  if (type === "Continuous") {
    if (subtype === "Range") {
      return (
        <DoubleSlider
          handleSize={handleSize}
          min={min}
          max={max}
          onChange={onChange as SliderPositionFunctionDual}
        />
      );
    }
    return (
      <SingleSlider
        handleSize={handleSize}
        min={min}
        max={max}
        onChange={onChange as SliderPositionFunction}
      />
    );
  } else {
    if (subtype === "Range") {
      return (
        <DoubleSlider
          handleSize={handleSize}
          steps={steps}
          min={min}
          max={max}
          onChange={onChange as SliderPositionFunctionDual}
        />
      );
    }
    return (
      <SingleSlider
        handleSize={handleSize}
        steps={steps}
        min={min}
        max={max}
        onChange={onChange as SliderPositionFunction}
      />
    );
  }
};

export default Slider;

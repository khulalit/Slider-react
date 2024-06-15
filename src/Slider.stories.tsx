import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Slider, { SliderProps } from "./components/Slider";

export default {
  title: "Components/Slider",
  component: Slider,
} as Meta;

const Template: StoryFn<SliderProps> = (args: SliderProps) => (
  <Slider {...args} />
);

export const ContinuousSingle = Template.bind({});
ContinuousSingle.args = {
  type: "Continuous",
  subtype: "Single",
  handleSize: "Size_24",
  min: 0,
  max: 100,
  onChange: (value: number) => console.log(`Value: ${value}`),
};

export const ContinuousRange = Template.bind({});
ContinuousRange.args = {
  type: "Continuous",
  subtype: "Range",
  handleSize: "Size_24",
  min: 0,
  max: 100,
  onChange: ({ left, right }: { left: number; right: number }) =>
    console.log(`Left: ${left}, Right: ${right}`),
};

export const DiscreteSingle = Template.bind({});
DiscreteSingle.args = {
  type: "Discreet",
  subtype: "Single",
  handleSize: "Size_24",
  steps: 10,
  min: 0,
  max: 100,
  onChange: (value: number) => console.log(`Value: ${value}`),
};

export const DiscreteRange = Template.bind({});
DiscreteRange.args = {
  type: "Discreet",
  subtype: "Range",
  handleSize: "Size_24",
  steps: 10,
  min: 0,
  max: 100,
  onChange: ({ left, right }: { left: number; right: number }) =>
    console.log(`Left: ${left}, Right: ${right}`),
};

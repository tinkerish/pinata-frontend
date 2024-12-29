import type { Meta, StoryObj } from "@storybook/react";
import CustomToggle from "../components/CustomToggle";
import { useState } from "react";
import { ToggleType } from "../types/common";

const meta: Meta<typeof CustomToggle> = {
  component: CustomToggle,
  title: "CustomToggle",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CustomToggle>;

const ToggleCheckBox = () => {
  const [fieldVal, setFieldVal] = useState(false);
  const onChange = (val: boolean) => {
    setFieldVal(val);
  };
  console.log(fieldVal);

  return (
    <CustomToggle
      onChange={onChange}
      value={fieldVal}
      type={ToggleType.Checkbox}
      size={5}
    />
  );
};
const ToggleSwitch = () => {
  const [fieldVal, setFieldVal] = useState(false);
  const onChange = (val: boolean) => {
    setFieldVal(val);
  };
  console.log(fieldVal);

  return (
    <CustomToggle
      onChange={onChange}
      value={fieldVal}
      type={ToggleType.Switch}
      size={3}
    />
  );
};

export const ToggleCheckBoxStory: Story = {
  name: "ToggleCheckBox",
  render: () => <ToggleCheckBox />,
};
export const ToggleSwitchStory: Story = {
  name: "ToggleSwitch",
  render: () => <ToggleSwitch />,
};

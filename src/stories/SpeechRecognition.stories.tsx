import type { Meta, StoryObj } from "@storybook/react";
import "regenerator-runtime/runtime";

import SpeechRecognitionComponent from "../components/SpeechRecognition";
import { useCallback, useState } from "react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof SpeechRecognitionComponent> = {
  component: SpeechRecognitionComponent,
  title: "SpeechRecognition",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SpeechRecognitionComponent>;

const SpeechRecognition = () => {
  const [fieldVal, setFieldVal] = useState("");
  const onChange = useCallback((val: string) => {
    setFieldVal(val);
  }, []);

  return (
    <div>
      <input
        type="text"
        className="border border-solid border-black"
        onChange={(e) => onChange(e.target.value)}
        value={fieldVal}
      />
      <SpeechRecognitionComponent onChange={onChange} isEnabled />;
    </div>
  );
};

export const SpeechRecognitionStory: Story = {
  name: "SpeechRecognition",
  render: () => <SpeechRecognition />,
};

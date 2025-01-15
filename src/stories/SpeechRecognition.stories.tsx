import type { Meta, StoryObj } from "@storybook/react";
import "regenerator-runtime/runtime";

import SpeechRecognitionComponent from "../components/SpeechRecognition";
import { useState } from "react";

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

  return <SpeechRecognitionComponent onChange={setFieldVal} value={fieldVal} />;
};

export const SpeechRecognitionStory: Story = {
  name: "SpeechRecognition",
  render: () => <SpeechRecognition />,
};

import type { Meta, StoryObj } from "@storybook/react";
import FileUploader from "../components/FileUploader";
import { useState } from "react";

const meta: Meta<typeof FileUploader> = {
  component: FileUploader,
  title: "FileUpload",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

const FileUpload = () => {
  const [image, setImage] = useState<File[] | null>(null);
  const [video, setVideo] = useState<File[] | null>(null);
  const handleChange = (
    imagefiles: File[] | null,
    videoFiles: File[] | null
  ) => {
    setImage(imagefiles);
    setVideo(videoFiles);
  };
  return (
    <div className="">
      <FileUploader image={image} video={video} onChange={handleChange} />
    </div>
  );
};

export const FileUploadStory: Story = {
  name: "FileUpload",
  render: () => <FileUpload />,
};

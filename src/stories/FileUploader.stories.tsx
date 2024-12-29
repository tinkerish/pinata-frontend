import type { Meta, StoryObj } from "@storybook/react";
import FileUploader from "../components/FileUploader";

const meta: Meta<typeof FileUploader> = {
  component: FileUploader,
  title: "FileUpload",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

const FileUpload = () => {
  return (
    <div className="">
      <FileUploader />
    </div>
  );
};

export const FileUploadStory: Story = {
  name: "FileUpload",
  render: () => <FileUpload />,
};

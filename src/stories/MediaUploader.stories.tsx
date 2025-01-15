import type { Meta, StoryObj } from "@storybook/react";
import MediaUploader from "../components/MediaUploader";
import { useState } from "react";
import axios from "axios";
import { UploadStatus } from "../types/form";

const meta: Meta<typeof MediaUploader> = {
  component: MediaUploader,
  title: "MediaUpload",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MediaUploader>;

const MediaUpload = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<UploadStatus>(null);
  const onUploadProgress = (progressEvent) => {
    const { loaded, total } = progressEvent;
    const percentCompleted = Math.round((loaded * 100) / total);
    setProgress(percentCompleted);
  };
  const upload = async (e) => {
    const file = e.target.files[0];
    try {
      const resp = await axios.post("https://v2.convertapi.com/upload", file, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Disposition": `inline; filename=${file.name}`,
        },
        onUploadProgress,
      });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      // setTimeout(() => {
      //   setProgress(0);
      //   setStatus(null);
      // }, 3000);
    }
  };
  return (
    <div>
      <input type="file" onChange={upload} />
      <div className="w-[40px] h-[40px] rounded shadow-lg flex justify-center items-center">
        <MediaUploader progress={progress} status={status} />
      </div>
    </div>
  );
};

export const MediaUploadStory: Story = {
  name: "MediaUpload",
  render: () => <MediaUpload />,
};

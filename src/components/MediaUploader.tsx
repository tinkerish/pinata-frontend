import { FC, useEffect, useRef } from "react";
import "../styles/mediaUploader.css";
import { UploadStatus } from "../types/form";
interface MediaUploaderProps {
  progress: number;
  status: UploadStatus;
}
const MediaUploader: FC<MediaUploaderProps> = ({ progress, status }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.setAttribute("aria-valuenow", `${progress}`);
      progressRef.current.style.setProperty("--progress", `${progress}%`);
    }
  }, [progress]);
  useEffect(() => {
    if (progressRef.current) {
      if (status === "success") {
        progressRef.current.style.setProperty(
          "--progress-color",
          "rgba(0, 255, 0,0.7)"
        );
      } else if (status === "error") {
        progressRef.current.style.setProperty(
          "--progress-color",
          "rgba(255, 0, 0,0.7)"
        );
      }
    }
  }, [status]);
  return (
    <div className="progress-bar" role="progressbar" ref={progressRef}></div>
  );
};

export default MediaUploader;

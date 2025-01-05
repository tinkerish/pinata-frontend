import { FC, useState } from "react";
import fileUpload from "../assets/upload.png";
import "../styles/fileUpload.css";
import { filterFileTypes } from "../utils/filterFileTypes";
import {
  BsFiletypeGif,
  BsFiletypeJpg,
  BsFiletypeMp4,
  BsFiletypePng,
} from "react-icons/bs";
import { FileUploadType } from "../types/form";
import { fileValidation } from "../utils/fileValidation";
import Error from "./Error";
const MAX_SIZE = "20 MB";
const FILE_TYPE = ["JPEG", "JPG", "PNG", "GIF", "MP4"];
const ICON_TYPE_MAPPER = {
  [FileUploadType.JPEG]: <BsFiletypeJpg size={50} />,
  [FileUploadType.JPG]: <BsFiletypeJpg size={50} />,
  [FileUploadType.PNG]: <BsFiletypePng size={50} />,
  [FileUploadType.GIF]: <BsFiletypeGif size={50} />,
  [FileUploadType.MP4]: <BsFiletypeMp4 size={50} />,
};
interface FileUploaderProps {
  image: File[] | null;
  video: File[] | null;
  onChange: (value: File[] | string, name: string) => void;
}
const FileUploader: FC<FileUploaderProps> = ({ image, video, onChange }) => {
  const [isDragZoneActive, setIsDragZoneActive] = useState(false);
  const [errors, setErrors] = useState({
    imageFiles: "",
    videoFiles: "",
    unwantedFiles: "",
  });
  const fileChangeHandler = (files: FileList | null) => {
    setErrors({ imageFiles: "", videoFiles: "", unwantedFiles: "" });
    const { unwantedFiles, imageFiles, videoFiles } = filterFileTypes(files);
    const newImageFiles = imageFiles
      ? image
        ? [...image, ...imageFiles]
        : imageFiles
      : [];
    const newVideoFiles = videoFiles
      ? video
        ? [...video, ...videoFiles]
        : videoFiles
      : [];
    const { errors, isErrors } = fileValidation(
      newImageFiles,
      newVideoFiles,
      unwantedFiles
    );
    if (isErrors) {
      setErrors(errors);
      return;
    }
    if (newImageFiles.length > 0) {
      onChange(newImageFiles, "image");
    }
    if (newVideoFiles.length > 0) {
      onChange(newVideoFiles, "video");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileChangeHandler(e.target.files);
  };
  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    fileChangeHandler(e.dataTransfer.files);
    setIsDragZoneActive(false);
  };
  const handleDragEnter = () => {
    setIsDragZoneActive(true);
  };
  const handleRemoveFiles = (type: string, index?: number) => {
    setErrors({ imageFiles: "", videoFiles: "", unwantedFiles: "" });
    if (type === "image") {
      if (image === null) return;
      const newImageFiles = image.filter((_, i) => i !== index);
      onChange(newImageFiles, "image");
    } else {
      onChange("", "video");
    }
  };
  console.log(image, video);

  return (
    <div className="flex flex-col gap-4">
      <div
        tabIndex={0}
        role="button"
        aria-label="Drag and drop area for file upload"
        aria-describedby="file-upload-instructions"
        aria-dragged={isDragZoneActive}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            document.getElementById("file-upload")?.click();
          }
        }}
        className={` ${
          isDragZoneActive ? "bg-gray-200 opacity-50" : ""
        } foccusable border-[2px] border-dashed border-gray-500 px-8 py-4 text-center rounded flex items-center justify-center flex-col relative gap-1 w-fit`}
      >
        <label htmlFor="file-upload" hidden>
          Upload File
        </label>
        <input
          type="file"
          name=""
          id="file-upload"
          multiple
          className={`absolute w-full h-full cursor-pointer opacity-0`}
          onDrop={handleDrop}
          onChange={handleChange}
          onDragEnter={handleDragEnter}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragZoneActive(false);
          }}
        />
        <img
          src={fileUpload}
          alt="file upload icon"
          className={`w-[4rem] pointer-events-none
            ${isDragZoneActive ? "scale-[0.9]" : ""}
            `}
        />
        <p
          id="file-upload-instructions"
          className={`text-xl pointer-events-none ${
            isDragZoneActive ? "scale-[0.9]" : ""
          }`}
        >
          Drag & Drop files of click to upload
        </p>
        <p
          className={`text-sm text-gray-500 pointer-events-none ${
            isDragZoneActive ? "scale-[0.9]" : ""
          }`}
        >
          Max one video and three image files allowed.
        </p>
        <p
          className={`text-[#4883e7] pointer-events-none ${
            isDragZoneActive ? "scale-[0.9]" : ""
          }`}
        >
          Only {FILE_TYPE.join(", ")} with total max size of {MAX_SIZE}.
        </p>
      </div>
      <div className="flex gap-2">
        {image &&
          image.map((file: File, index) => {
            return (
              <div className="relative">
                <div role="img" aria-label={`${file.name} icon`}>
                  {ICON_TYPE_MAPPER[file.type as FileUploadType]}
                </div>
                <button
                  className="absolute left-0 -top-1 bg-red-600 rounded-[100%] w-5 h-5 font-bold flex items-center justify-center"
                  onClick={() => handleRemoveFiles("image", index)}
                >
                  X
                </button>
              </div>
            );
          })}
        {video &&
          video.map((file: File) => {
            return (
              <div className="relative">
                <div role="img" aria-label={`${file.name} video icon`}>
                  {ICON_TYPE_MAPPER[file.type as FileUploadType]}
                </div>
                <button
                  className="absolute left-0 -top-1 bg-red-600 rounded-[100%] w-5 h-5 text-xl flex items-center justify-center"
                  onClick={() => handleRemoveFiles("video")}
                >
                  X
                </button>
              </div>
            );
          })}
      </div>
      <div>
        {errors.imageFiles && <Error errorMessage={errors.imageFiles} />}
        {errors.videoFiles && <Error errorMessage={errors.videoFiles} />}
        {errors.unwantedFiles && <Error errorMessage={errors.unwantedFiles} />}
      </div>
    </div>
  );
};

export default FileUploader;

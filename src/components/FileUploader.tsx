import { useState } from "react";
import fileUpload from "../assets/upload.png";
const MAX_SIZE = "20 MB";
const FILE_TYPE = ["JPEG", "JPG", "PNG", "GIF", "MP4"];
const FileUploader = () => {
  const [isDragZoneActive, setIsDragZoneActive] = useState(false);
  const handleChange = (e) => {
    console.log(e.target.files);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.files);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragZoneActive(true);
  };
  return (
    <div>
      <div
        className={` ${
          isDragZoneActive ? "bg-gray-200 opacity-50" : ""
        } border-[2px] border-dashed border-gray-500 px-8 py-4 text-center rounded flex items-center justify-center flex-col relative gap-1 w-fit hover:bg-gray-200 hover:opacity-80`}
      >
        <label htmlFor="file-upload" hidden>
          Upload File
        </label>
        <input
          type="file"
          name=""
          id="file-upload"
          multiple
          className={`absolute w-full h-full opacity-0 cursor-pointer`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => setIsDragZoneActive(false)}
        />
        <img
          src={fileUpload}
          alt="file upload icon"
          className={`w-[4rem] ${isDragZoneActive ? "scale-[0.9]" : ""}`}
        />
        <p className={`text-xl ${isDragZoneActive ? "scale-[0.9]" : ""}`}>
          Drag & Drop
        </p>
        <p
          className={`text-sm text-gray-500 ${
            isDragZoneActive ? "scale-[0.9]" : ""
          }`}
        >
          Max one video and three image files allowed.
        </p>
        <p
          className={`text-[#4883e7] ${isDragZoneActive ? "scale-[0.9]" : ""}`}
        >
          Only {FILE_TYPE.join(", ")} with total max size of {MAX_SIZE}.
        </p>
      </div>
      <div>
        {/* <BsFiletypePng />
        <BsFiletypeJpg />
        <BsFiletypeGif />
        <BsFiletypeMp4 /> */}
         
      </div>
    </div>
  );
};

export default FileUploader;

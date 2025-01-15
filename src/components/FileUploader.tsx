import { FC, forwardRef, useImperativeHandle, useState } from "react";
import fileUpload from "../assets/upload.png";
import "../styles/fileUpload.css";
import {
  BsFiletypeGif,
  BsFiletypeJpg,
  BsFiletypeMp4,
  BsFiletypePng,
} from "react-icons/bs";
import { FileMetaDataType, FileUploadType } from "../types/form";
import { fileValidationError } from "../types/common";
import { filterFileTypes } from "../utils/filterFileTypes";
import { fileValidation } from "../utils/fileValidation";
import Error from "./Error";
const ICON_TYPE_MAPPER = {
  [FileUploadType.JPEG]: <BsFiletypeJpg size={50} />,
  [FileUploadType.JPG]: <BsFiletypeJpg size={50} />,
  [FileUploadType.PNG]: <BsFiletypePng size={50} />,
  [FileUploadType.GIF]: <BsFiletypeGif size={50} />,
  [FileUploadType.MP4]: <BsFiletypeMp4 size={50} />,
};
interface FileUploaderProps {
  value?: FileMetaDataType | FileMetaDataType[];
  multiple?: boolean;
  allowedFileTypes: string[];
  allowedFileSize: string;
  additionalNotes?: string;
  maxFiles?: number;
}
export interface FileUploaderHandle {
  returnFiles: () => FileMetaDataType[] | FileMetaDataType;
}
const FileUploader: FC<FileUploaderProps> = forwardRef<
  FileUploaderHandle,
  FileUploaderProps
>(
  (
    {
      multiple = false,
      allowedFileTypes,
      allowedFileSize,
      additionalNotes,
      maxFiles = 1,
      value,
    },
    ref
  ) => {
    const [isDragZoneActive, setIsDragZoneActive] = useState(false);
    const [filePaths, setFilePaths] = useState<
      FileMetaDataType[] | FileMetaDataType
    >(value || []);
    const [errors, setErrors] = useState<fileValidationError | null>(null);
    const fileChangeHandler = async (fileList: FileList | null) => {
      setErrors(null);
      console.log(fileList);
      if (!fileList) return;
      if (fileList.length === 0) return;
      const { unwantedFiles, wantedFiles } = filterFileTypes(
        fileList,
        allowedFileTypes
      );
      const { errors, isErrors } = fileValidation(
        wantedFiles,
        filePaths,
        unwantedFiles,
        maxFiles,
        allowedFileSize
      );
      if (isErrors) {
        setErrors(errors);
        return;
      }
      if (multiple) {
        const newFilePaths = wantedFiles.map((file) => {
          return {
            name: file.name,
            type: file.type,
            size: file.size,
            url: URL.createObjectURL(file),
          };
        });
        setFilePaths((prevFiles) => [
          ...(prevFiles as FileMetaDataType[]),
          ...newFilePaths,
        ]);
      } else {
        const newFilePath = wantedFiles.map((file) => {
          return {
            name: file.name,
            type: file.type,
            size: file.size,
            url: URL.createObjectURL(file),
          };
        });
        setFilePaths(newFilePath[0]);
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
    const handleRemoveFiles = (index?: number) => {
      setErrors(null);
      if (Array.isArray(filePaths)) {
        const newFilePaths = filePaths.filter((_, i) => i !== index);
        setFilePaths(newFilePaths);
      } else {
        setFilePaths([]);
      }
    };
    console.log(filePaths);
    useImperativeHandle(ref, () => ({
      returnFiles: () => {
        return filePaths;
      },
    }));
    return (
      <div className="flex flex-col gap-4">
        <div
          tabIndex={0}
          role="button"
          aria-label="Drag and drop area for file upload"
          aria-describedby="file-upload-instructions"
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
            multiple={multiple}
            className={`absolute w-full h-full cursor-pointer opacity-0`}
            onDrop={handleDrop}
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragZoneActive(false);
            }}
            aria-label="file upload"
            aria-invalid={
              !!(errors?.fileCount || errors?.fileSize || errors?.invalidFormat)
            }
            aria-describedby={
              errors?.fileCount || errors?.fileSize || errors?.invalidFormat
                ? `file-upload-error`
                : undefined
            }
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
          {additionalNotes && (
            <p
              className={`text-sm text-gray-500 pointer-events-none ${
                isDragZoneActive ? "scale-[0.9]" : ""
              }`}
            >
              {additionalNotes}
            </p>
          )}
          <p
            className={`text-[#4883e7] pointer-events-none ${
              isDragZoneActive ? "scale-[0.9]" : ""
            }`}
          >
            Only {allowedFileTypes.join(", ")} with total max size of{" "}
            {allowedFileSize}.
          </p>
        </div>
        <div className="flex gap-2">
          {Array.isArray(filePaths) ? (
            filePaths.map((fileMeta: FileMetaDataType, index) => {
              return (
                <div className="relative">
                  <div role="img" aria-label={`${fileMeta.name} icon`}>
                    {ICON_TYPE_MAPPER[fileMeta.type as FileUploadType]}
                  </div>
                  <button
                    className="absolute left-0 -top-1 bg-red-600 rounded-[100%] w-5 h-5 font-bold flex items-center justify-center"
                    onClick={() => handleRemoveFiles(index)}
                  >
                    X
                  </button>
                </div>
              );
            })
          ) : (
            <div className="relative">
              <div role="img" aria-label={`${filePaths.name} icon`}>
                {ICON_TYPE_MAPPER[filePaths.type as FileUploadType]}
              </div>
              <button
                className="absolute left-0 -top-1 bg-red-600 rounded-[100%] w-5 h-5 font-bold flex items-center justify-center"
                onClick={() => handleRemoveFiles()}
              >
                X
              </button>
            </div>
          )}
        </div>
        <div>
          {errors?.fileCount && (
            <Error id="file-upload-error" errorMessage={errors.fileCount} />
          )}
          {errors?.fileSize && (
            <Error id="file-upload-error" errorMessage={errors.fileSize} />
          )}
          {errors?.invalidFormat && (
            <Error
              id="file-upload-error"
              errorMessage={errors?.invalidFormat}
            />
          )}
        </div>
      </div>
    );
  }
);

export default FileUploader;

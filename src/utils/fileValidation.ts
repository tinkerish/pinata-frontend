import { FileMetaDataType } from "../types/form";

export const fileValidation = (
  wantedFiles: File[],
  previousFiles: FileMetaDataType[] | FileMetaDataType,
  unwantedFiles: File[],
  maxFiles: number,
  maxFileSize: string
) => {
  const errors = {
    invalidFormat: "",
    fileSize: "",
    fileCount: "",
  };
  const mergedFiles = Array.isArray(previousFiles)
    ? [...previousFiles, ...wantedFiles]
    : [previousFiles, ...wantedFiles];
  if (unwantedFiles.length > 0) {
    errors.invalidFormat = "Invalid file format";
  }
  if (mergedFiles.length > maxFiles) {
    errors.fileCount = "File count exceeded";
  }
  let totalSize = 0;
  for (const file of wantedFiles) {
    totalSize += file.size;
  }
  const maxSize = parseInt(maxFileSize) * 1024 * 1024;
  if (totalSize > maxSize) {
    errors.fileSize = "File size exceeded";
  }
  return {
    errors,
    isErrors: Object.values(errors).some((error) => error.length > 0),
  };
};

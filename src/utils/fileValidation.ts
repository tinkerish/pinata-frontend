export const fileValidation = (
  imageFiles: File[],
  videoFiles: File[],
  unwantedFiles: File[]
) => {
  const errors = {
    imageFiles: "",
    videoFiles: "",
    unwantedFiles: "",
  };
  let isErrors = false;
  if (imageFiles?.length > 3) {
    errors.imageFiles = "Max 3 image files allowed";
  }
  if (videoFiles?.length > 1) {
    errors.videoFiles = "Max 1 audio file allowed";
  }
  if (unwantedFiles?.length > 0) {
    errors.unwantedFiles = "Other file types are not allowed";
  }
  if (errors.imageFiles || errors.videoFiles || errors.unwantedFiles) {
    isErrors = true;
  }
  return {
    errors,
    isErrors,
  };
};

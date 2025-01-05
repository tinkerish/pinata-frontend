export const filterFileTypes = (files: FileList | null) => {
  const videoFiles: File[] = [];
  const imageFiles: File[] = [];
  const unwantedFiles: File[] = [];
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const fileType = files[i].type.split("/")[1];
      if (
        fileType === "png" ||
        fileType === "jpg" ||
        fileType === "gif" ||
        fileType === "jpeg"
      ) {
        imageFiles.push(files[i]);
      } else if (fileType === "mp4") {
        videoFiles.push(files[i]);
      } else {
        unwantedFiles.push(files[i]);
      }
      console.log(files[i]);
    }
  }
  return {
    imageFiles,
    videoFiles,
    unwantedFiles,
  };
};

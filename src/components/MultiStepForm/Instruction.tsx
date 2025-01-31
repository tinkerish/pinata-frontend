import { FC, useCallback, useRef, useState } from "react";
import { FileMetaDataType, Instruction } from "../../types/form";
import SpeechRecognitionComponent from "../SpeechRecognition";
import Modal from "../Modal";
import FileUploader, { FileUploaderHandle } from "../FileUploader";
import { MdOutlineFileUpload } from "react-icons/md";
import "../../styles/instruction.css";
import Error from "../Error";
const MAX_IMAGE_SIZE = "8 MB";
const MAX_VIDEO_SIZE = "10 MB";
const IMAGE_FILE_TYPE = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
const VIDEO_FILE_TYPE = ["video/mp4"];
interface InstructionComponentProps {
  value: Instruction;
  onChange: (value: Instruction, index: number) => void;
  index: number;
  error?: string;
}
const InstructionComponent: FC<InstructionComponentProps> = ({
  value,
  onChange,
  index,
  error,
}) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const imageUploaderRef = useRef<FileUploaderHandle | null>(null);
  const videoUploaderRef = useRef<FileUploaderHandle | null>(null);
  const [imageButtonRef, setImageButtonRef] =
    useState<HTMLButtonElement | null>(null);

  const [videoButtonRef, setVideoButtonRef] =
    useState<HTMLButtonElement | null>(null);

  const openImageModal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setImageButtonRef(document.activeElement as HTMLButtonElement);
      setShowImageModal(true);
    },
    []
  );

  const closeImageModal = useCallback(() => {
    imageButtonRef?.focus();
    setShowImageModal(false);
  }, [imageButtonRef]);

  const openVideoModal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setVideoButtonRef(document.activeElement as HTMLButtonElement);
      setShowVideoModal(true);
    },
    []
  );

  const closeVideoModal = useCallback(() => {
    videoButtonRef?.focus();
    setShowVideoModal(false);
  }, [videoButtonRef]);
  const handleChange = (
    val: string | FileMetaDataType[] | FileMetaDataType | undefined,
    name: string
  ) => {
    onChange(
      {
        ...value,
        [name]: val,
      },
      index
    );
  };
  const handleSaveImageFiles = () => {
    if (imageUploaderRef.current) {
      const files =
        imageUploaderRef.current?.returnFiles() as FileMetaDataType[];
      if (files && files.length > 0) {
        handleChange(files, "image");
      } else {
        handleChange(undefined, "image");
      }
      closeImageModal();
    }
  };
  const handleSaveVideoFiles = () => {
    if (videoUploaderRef.current) {
      const file = videoUploaderRef.current?.returnFiles();
      if (Array.isArray(file)) {
        handleChange(undefined, "video");
      } else {
        handleChange(file, "video");
      }
      closeVideoModal();
    }
  };

  return (
    <div className="w-[80%] flex flex-col gap-3">
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="instruction" className="md:text-lg text-sm">
          Instruction
        </label>
        <div className="flex items-center gap-2 w-full">
          <SpeechRecognitionComponent
            onChange={handleChange}
            value={value.instruction}
            error={error}
            index={index}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="tips" className="md:text-lg text-sm">
          Tips
        </label>
        <input
          type="text"
          id="tips"
          name="tips"
          value={value.tips}
          onChange={(e) => handleChange(e.target.value, e.target.name)}
          className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 w-full"
        />
      </div>
      <div className="flex items-center justify-between py-2 w-full">
        <Modal
          containerClassName="#root"
          onClose={closeImageModal}
          show={showImageModal}
          title=" Modal Component"
          actionButtonName="Save"
          onSave={handleSaveImageFiles}
        >
          <FileUploader
            ref={imageUploaderRef}
            value={value.image}
            maxFiles={3}
            multiple={true}
            allowedFileSize={MAX_IMAGE_SIZE}
            allowedFileTypes={IMAGE_FILE_TYPE}
            additionalNotes="Max three image files allowed."
          />
        </Modal>
        <button
          onClick={openImageModal}
          className="flex items-center justify-center px-3 py-2 shadow-[0px_0px_3px_1px_#00000024] text-[#e3752c] lg:font-medium rounded lg:text-lg md:text-sm text-xs w-full hover:bg-[#ff8a42] active:bg-[#c06124] hover:text-white active:text-white font-semibold modal-button-foccusable transition-all"
        >
          <MdOutlineFileUpload size={25} />
          {value.image && value.image.length > 0 ? "Edit" : "Upload"} Image
          Files
        </button>
      </div>
      <div className="flex items-center justify-between py-2 w-full">
        <Modal
          containerClassName="#root"
          onClose={closeVideoModal}
          show={showVideoModal}
          title=" Modal Component"
          actionButtonName="Save"
          onSave={handleSaveVideoFiles}
        >
          <FileUploader
            value={value.video}
            maxFiles={1}
            multiple={false}
            allowedFileSize={MAX_VIDEO_SIZE}
            allowedFileTypes={VIDEO_FILE_TYPE}
            additionalNotes="Max one video file allowed."
            ref={videoUploaderRef}
          />
        </Modal>
        <button
          onClick={openVideoModal}
          className="flex items-center justify-center px-3 py-2 shadow-[0px_0px_3px_1px_#00000024] text-[#e3752c] lg:font-medium rounded lg:text-lg md:text-sm text-xs w-full hover:bg-[#ff8a42] active:bg-[#c06124] hover:text-white active:text-white font-semibold modal-button-foccusable transition-all"
        >
          <MdOutlineFileUpload size={25} />
          {value.video ? "Edit" : "Upload"} Video File
        </button>
      </div>

      <div aria-live="assertive">
        {error && (
          <Error id={`instruction-error-${index}`} errorMessage={error} />
        )}
      </div>
    </div>
  );
};

export default InstructionComponent;

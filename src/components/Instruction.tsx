import { FC, useCallback, useState } from "react";
import { Instruction } from "../types/form";
import SpeechRecognitionComponent from "./SpeechRecognition";
import Modal from "./Modal";
import FileUploader from "./FileUploader";
import { MdOutlineFileUpload } from "react-icons/md";
import "../styles/instruction.css";

interface InstructionComponentProps {
  value: Instruction;
  onChange: (value: Instruction, index: number) => void;
  index: number;
}
const InstructionComponent: FC<InstructionComponentProps> = ({
  value,
  onChange,
  index,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const openModal = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setButtonRef(document.activeElement as HTMLButtonElement);
    setShowModal(true);
  }, []);
  const closeModal = useCallback(() => {
    buttonRef?.focus();
    setShowModal(false);
  }, [buttonRef]);
  const handleChange = (val: string | File[], name: string) => {
    onChange(
      {
        ...value,
        [name]: val,
      },
      index
    );
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
          onClose={closeModal}
          show={showModal}
          title=" Modal Component"
          actionButtonName="Save"
        >
          <FileUploader
            image={value.image}
            video={value.video}
            onChange={handleChange}
          />
        </Modal>
        <button
          onClick={openModal}
          className="flex items-center justify-center px-3 py-2 shadow-[0px_0px_3px_1px_#00000024] text-[#e3752c] lg:font-medium rounded lg:text-lg md:text-sm text-xs w-full hover:bg-[#ff8a42] active:bg-[#c06124] hover:text-white active:text-white font-semibold modal-button-foccusable transition-all"
        >
          <MdOutlineFileUpload size={25} />
          Upload Media Files
        </button>
      </div>
    </div>
  );
};

export default InstructionComponent;

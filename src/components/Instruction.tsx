import { FC, useCallback, useState } from "react";
import { Instruction } from "../types/form";
import { MdOutlineFileUpload } from "react-icons/md";
import SpeechRecognitionComponent from "./SpeechRecognition";
import CustomToggle from "./CustomToggle";
import { ToggleType } from "../types/common";

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
  const [isAudioType, setIsAudioType] = useState(false);
  const handleChange = (val: string) => {
    onChange(
      {
        ...value,
        ["instruction"]: val,
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
          <input
            type="text"
            id="instruction"
            name="instruction"
            value={value.instruction}
            onChange={(e) => handleChange(e.target.value)}
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 w-[70%]"
            disabled={isAudioType}
          />
          <div className="flex items-center justify-between gap-2 w-[30%]">
            <SpeechRecognitionComponent
              onChange={handleChange}
              isEnabled={isAudioType}
            />
            <CustomToggle
              onChange={setIsAudioType}
              value={isAudioType}
              type={ToggleType.Switch}
              size={1.5}
            />
          </div>
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
          onChange={handleChange}
          className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 w-full"
        />
      </div>
      <div className="flex items-center justify-between py-2 w-full">
        <div className="w-[49%]">
          <label htmlFor="intruction-image" hidden>
            Image
          </label>
          <div className="relative flex items-center gap-1 w-full">
            <button className="flex items-center px-3 py-1 shadow-[0px_0px_1px_1px_#00000024] text-[#e3752c] lg:font-medium rounded lg:text-lg md:text-sm text-xs font-normal w-[49%]">
              <MdOutlineFileUpload />
              Upload Image
            </button>
            <span className="w-[49%] lg:text-lg md:text-sm text-xs">
              No File Choosen
            </span>
            <input
              type="file"
              id="instruction-image"
              name="image"
              value={value.image}
              onChange={handleChange}
              className="absolute w-full h-full opacity-0"
            />
          </div>
        </div>
        <div className="w-[49%]">
          <label htmlFor="intruction-video" hidden>
            Video
          </label>
          <div className="relative flex items-center gap-1 w-full">
            <button className="flex items-center px-3 py-1 shadow-[0px_0px_1px_1px_#00000024] text-[#e3752c] lg:font-medium rounded lg:text-lg md:text-sm text-xs font-normal w-[49%]">
              <MdOutlineFileUpload size={25} />
              Upload Image
            </button>
            <span className="w-[49%] lg:text-lg md:text-sm text-xs">
              No File Choosen
            </span>
            <input
              type="file"
              id="instruction-video"
              name="video"
              value={value.video}
              onChange={handleChange}
              className="absolute w-full h-full opacity-0 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionComponent;

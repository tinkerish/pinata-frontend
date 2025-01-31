import { FC, useState } from "react";
import { Instruction as InstructionType } from "../../types/form";
import lightBulb from "../../assets/light-bulb.png";
import CustomToggle from "../CustomToggle";
import { ToggleType } from "../../types/common";
interface InstructionViewProps {
  instructions: InstructionType[];
  servingSize: number;
}
const InstructionView: FC<InstructionViewProps> = ({ instructions }) => {
  const [showMedia, setShowMedia] = useState(true);
  const onChange = (val: boolean) => {
    setShowMedia(val);
  };
  return (
    <div className="pt-4 flex flex-col gap-4">
      <div className="flex items-center justify-between p-4 text-[#a1a1a1]">
        <CustomToggle
          type={ToggleType.Switch}
          onChange={onChange}
          value={showMedia}
          size={1}
          label="Show Media"
        />
        <p>{instructions.length} items</p>
      </div>
      <div className="flex flex-col bg-[#ebebeb] p-8 rounded-lg shadow-md gap-8">
        {instructions.map((instruction, index) => {
          return (
            <Instruction
              key={index}
              instruction={instruction}
              index={index + 1}
              showMedia={showMedia}
            />
          );
        })}
      </div>
    </div>
  );
};
interface InstructionProps {
  instruction: InstructionType;
  index: number;
  showMedia: boolean;
}
const Instruction: FC<InstructionProps> = ({
  instruction,
  index,
  showMedia,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-[100%] text-xl bg-[#e3752c] flex items-center justify-center text-white">
          {index}
        </div>
        <div className="flex items-center">
          <p className="leading-relaxed">
            {instruction.instruction}
            {instruction.tips && (
              <>
                <span className="text-[#838383]"> (</span>
                <img
                  src={lightBulb}
                  alt=""
                  className="w-[1.15rem] h-[1.15rem] align-middle inline-block"
                />
                <span className="text-[#838383]">{instruction.tips})</span>
              </>
            )}
          </p>
        </div>
      </div>
      {showMedia && (
        <>
          {instruction.image && (
            <div
              className={`px-8 grid gap-14 ${
                instruction.image
                  ? instruction.image.length === 1
                    ? "grid-cols-1"
                    : instruction.image.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
                  : ""
              }`}
            >
              {instruction.image.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="w-full overflow-hidden shadow-[0px_0px_9px_0px_#a0aec0] rounded-xl"
                  >
                    <img
                      key={index}
                      src={image.url}
                      alt={image.name}
                      className={`object-fill w-full rounded-xl ${
                        instruction.image?.length === 1 ? "" : "aspect-square"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {instruction.video && (
            <div className="px-8">
              <video
                src={instruction.video.url}
                controls
                className="object-fill w-full aspect-video rounded-xl"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default InstructionView;

import { FC } from "react";
import { Instruction } from "../types/common";

interface InstructionComponentProps {
  value: Instruction;
  onChange: (value: Instruction) => void;
}
const InstructionComponent: FC<InstructionComponentProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputVal } = e.target;
    onChange({
      ...value,
      [name]: inputVal,
    });
  };
  return (
    <div>
      <div>
        <label htmlFor="instruction">Instruction</label>
        <input
          type="text"
          id="instruction"
          name="instruction"
          value={value.instruction}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="intruction-image">Image</label>
        <input
          type="file"
          id="instruction-image"
          name="quantity"
          value={value.image}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="intruction-video">Video</label>
        <input
          type="file"
          id="instruction-video"
          name="video"
          value={value.video}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="tips">Tips</label>
        <input
          type="text"
          id="tips"
          name="tips"
          value={value.tips}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default InstructionComponent;

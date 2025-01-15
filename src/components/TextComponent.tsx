import { FC } from "react";

interface TextFieldProps {
  value: string;
  onChange: (updatedValue: string) => void;
}

const TextComponent: FC<TextFieldProps> = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border p-1"
        placeholder="Enter some text"
      />
    </div>
  );
};

export default TextComponent;

import { FC, useMemo } from "react";
import { ToggleType } from "../types/common";

export interface CustomToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  type: ToggleType;
  size?: number;
}
type CheckboxProps = Omit<CustomToggleProps, "type">;
type SwitchProps = Omit<CustomToggleProps, "type">;
const CustomToggle: FC<CustomToggleProps> = ({
  onChange,
  value,
  type,
  size,
}) => {
  switch (type) {
    case ToggleType.Checkbox:
      return <Checkbox onChange={onChange} value={value} size={size} />;
    case ToggleType.Switch:
      return <Switch onChange={onChange} value={value} size={size} />;
    default:
      return null;
  }
};

const Checkbox: FC<CheckboxProps> = ({ value, onChange, size = 5 }) => {
  return (
    <div className="flex">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className={`appearance-none relative peer shrink-0  border-2 border-solid border-black rounded-sm bg-white mt-1
        checked:bg-[#e3752c]`}
        style={{ width: `${size}rem`, height: `${size}rem` }}
      />
      <svg
        className={`absolute mt-1 hidden peer-checked:block pointer-events-none`}
        style={{ width: `${size}rem`, height: `${size}rem` }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
};
const Switch: FC<SwitchProps> = ({ value, onChange, size = 10 }) => {
  const width = useMemo(() => size * 2, [size]);
  return (
    <div className="relative">
      <button
        className={`flex items-center ${
          value ? "justify-end bg-[#e3752c]" : "justify-start bg-[#d2d2d2]"
        }`}
        style={{
          width: `${width}rem`,
          height: `${size}rem`,
          borderRadius: `${size}rem`,
        }}
      >
        <div
          className={`h-full  rounded-full bg-white shadow-[0px_0px_36px_3px_#00000024]`}
          style={{ width: `${size}rem` }}
        ></div>
      </button>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className={`absolute top-0 left-0 opacity-0 cursor-pointer`}
        style={{ width: `${width}rem`, height: `${size}rem` }}
      />
    </div>
  );
};
export default CustomToggle;

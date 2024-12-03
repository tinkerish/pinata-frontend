import { FC } from "react";

type Option = {
  value: string;
  name: string;
};

interface SelectProps {
  label: string;
  labelHidden?: boolean;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  inputClassName?: string;
  className?: string;
}

const Select: FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  name,
  labelHidden,
  inputClassName,
  className,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} hidden={labelHidden}>
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        className={inputClassName}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

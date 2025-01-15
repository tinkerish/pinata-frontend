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
  labelClassName?: string;
  ariaDescribedby?: string;
  ariaInvalid?: boolean;
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
  labelClassName,
  ariaDescribedby,
  ariaInvalid,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className={`${labelClassName} ${labelHidden ? "sr-only" : ""}`}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        className={inputClassName}
        aria-describedby={ariaDescribedby}
        aria-invalid={ariaInvalid}
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

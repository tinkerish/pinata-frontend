import { FC,   useState } from "react";
export interface DynamicFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
}
const DynamicFieldComponent: FC<DynamicFieldProps> = ({ value, onChange }) => {
  const [fieldValue, setFieldValue] = useState<string[]>(
    value.length === 0 ? [""] : value
  );
  function addField(e: React.MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault();
    const newFields = [...fieldValue];
    if (index === fieldValue.length - 1) {
      newFields.push("");
    } else {
      newFields.splice(index + 1, 0, "");
    }
    setFieldValue(newFields);
    onChange(newFields);
  }
  function changeHandler(val: string, index: number) {
    const newFields = [...fieldValue];
    newFields[index] = val;
    setFieldValue(newFields);
    onChange(newFields);
  }
  function removeField(e: React.MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault();
    const newFields = fieldValue.filter((_, i) => i !== index);
    setFieldValue(newFields);
    onChange(newFields);
  }
  return (
    <div className="flex flex-col gap-4">
      <p>You can add your ingredients here</p>
      {fieldValue.map((field, index) => (
        <div key={index} className="flex gap-4 items-center">
          <input
            type="text"
            value={field}
            onChange={(e) => changeHandler(e.target.value, index)}
            placeholder="Enter ingredient"
            className="p-2"
          />
          <button
            onClick={(e) => addField(e, index)}
            className="w-8 h-8 border border-solid border-black rounded-full"
          >
            +
          </button>
          {fieldValue.length > 1 && (
            <button
              onClick={(e) => removeField(e, index)}
              className="w-8 h-8 border border-solid border-black rounded-full"
            >
              -
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

// export const DynamicField =         (DynamicFieldComponent);
export const DynamicField = DynamicFieldComponent;

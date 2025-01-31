import { FC, useCallback, useMemo } from "react";
import { Ingredient, IngredientMeasurement, Instruction } from "../types/form";
import IngredientComponent from "./MultiStepForm/Ingredient";
import InstructionComponent from "./MultiStepForm/Instruction";
import { DynamicFieldContext } from "../types/common";
export interface DynamicFieldProps {
  value: string[] | Ingredient[] | Instruction[];
  onChange: (value: string[] | Ingredient[] | Instruction[]) => void;
  context: DynamicFieldContext;
  error: string[];
}
const DynamicFieldComponent: FC<DynamicFieldProps> = ({
  value,
  onChange,
  context,
  error,
}) => {
  const defaultValue = useMemo(() => {
    return context === DynamicFieldContext.Ingredient
      ? {
          name: "",
          quantity: 0,
          measurementUnit: "grams" as IngredientMeasurement,
          notes: "",
        }
      : context === DynamicFieldContext.Instruction
      ? {
          instruction: "",
          image: undefined,
          video: undefined,
          tips: "",
        }
      : "";
  }, [context]);
  function addField(e: React.MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault();
    const newFields = [...value];
    if (index === value.length - 1) {
      newFields.push(defaultValue);
    } else {
      newFields.splice(index + 1, 0, defaultValue);
    }
    if (context === DynamicFieldContext.Ingredient) {
      onChange(newFields as Ingredient[]);
    } else if (context === DynamicFieldContext.Instruction) {
      onChange(newFields as Instruction[]);
    }
  }
  const changeHandler = useCallback(
    (val: string | Ingredient | Instruction, index: number) => {
      const newFields = [...value];
      newFields[index] = val;
      if (context === DynamicFieldContext.Ingredient) {
        onChange(newFields as Ingredient[]);
      } else if (context === DynamicFieldContext.Instruction) {
        onChange(newFields as Instruction[]);
      }
    },

    [context, onChange, value]
  );
  function removeField(e: React.MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault();
    const newFields = value.filter((_, i) => i !== index);
    if (context === DynamicFieldContext.Ingredient) {
      onChange(newFields as Ingredient[]);
    } else if (context === DynamicFieldContext.Instruction) {
      onChange(newFields as Instruction[]);
    }
  }
  const renderContext = (
    field: string | Ingredient | Instruction,
    index: number
  ) => {
    switch (context) {
      case DynamicFieldContext.Ingredient:
        return (
          <IngredientComponent
            value={field as Ingredient}
            index={index}
            onChange={changeHandler}
            error={error?.[index]}
          />
        );
      case DynamicFieldContext.Instruction:
        return (
          <InstructionComponent
            value={field as Instruction}
            index={index}
            onChange={changeHandler}
            error={error?.[index]}
          />
        );

      default:
        return "text";
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      {value.map((field, index) => {
        return (
          <div className="flex justify-between items-center w-full">
            {renderContext(field, index)}
            <div className="w-[15%] flex justify-between items-center">
              <button
                onClick={(e) => addField(e, index)}
                className="md:w-6 md:h-6 w-4 h-4 p-1 border border-solid border-black rounded-full flex items-center justify-center"
              >
                +
              </button>
              {value.length > 1 && (
                <button
                  onClick={(e) => removeField(e, index)}
                  className="md:w-6 md:h-6 w-4 h-4 p-1 border border-solid border-black rounded-full flex items-center justify-center"
                >
                  -
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const DynamicField = DynamicFieldComponent;

import { FC, useCallback, useMemo, useState } from "react";
import { Ingredient, IngredientMeasurement, Instruction } from "../types/form";
import IngredientComponent from "./Ingredient";
import InstructionComponent from "./Instruction";
import Error from "./Error";
import { DynamicFieldContext } from "../types/common";
export interface DynamicFieldProps {
  value: string[] | Ingredient[] | Instruction[];
  onChange: (value: string[] | Ingredient[] | Instruction[]) => void;
  context: DynamicFieldContext;
  error?: Record<string, string>;
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
          image: "",
          video: "",
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
    // setFieldValue(newFields as string[] | Ingredient[]);
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
      // setFieldValue(newFields as string[] | Ingredient[] | Instruction[]);
      if (context === DynamicFieldContext.Ingredient) {
        onChange(newFields as Ingredient[]);
      } else if (context === DynamicFieldContext.Instruction) {
        onChange(newFields as Instruction[]);
      }
      console.log(val);
    },

    [context, onChange]
  );
  function removeField(e: React.MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault();
    const newFields = value.filter((_, i) => i !== index);
    // setFieldValue(newFields as string[] | Ingredient[] | Instruction[]);
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
            // onChange={(value: Ingredient) => changeHandler(value, index)}
            index={index}
            onChange={changeHandler}
          />
        );
      case DynamicFieldContext.Instruction:
        return (
          <InstructionComponent
            value={field as Instruction}
            // onChange={(value: Instruction) => changeHandler(value, index)}
            index={index}
            onChange={changeHandler}
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
      {error?.ingredients && <Error errorMessage={error.ingredients} />}
    </div>
  );
};

export const DynamicField = DynamicFieldComponent;

import { FC, useState } from "react";
import {
  DynamicFieldContext,
  Ingredient,
  IngredientMeasurement,
  Instruction,
} from "../types/common";
import IngredientComponent from "./Ingredient";
import InstructionComponent from "./Instruction";
export interface DynamicFieldProps {
  value: string[] | Ingredient[] | Instruction[];
  onChange: (value: string[] | Ingredient[] | Instruction[]) => void;
  context: DynamicFieldContext;
  error?: string;
}
const DynamicFieldComponent: FC<DynamicFieldProps> = ({
  value,
  onChange,
  context,
  error,
}) => {
  const [fieldValue, setFieldValue] = useState<
    string[] | Ingredient[] | Instruction[]
  >(value);
  const defaultValue =
    context === DynamicFieldContext.Ingredient
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
  function addField(e: React.MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault();
    const newFields = [...fieldValue];
    if (index === fieldValue.length - 1) {
      newFields.push(defaultValue);
    } else {
      newFields.splice(index + 1, 0, defaultValue);
    }
    setFieldValue(newFields as string[] | Ingredient[]);
    if (context === DynamicFieldContext.Ingredient) {
      onChange(newFields as Ingredient[]);
    } else if (context === DynamicFieldContext.Instruction) {
      onChange(newFields as Instruction[]);
    }
  }
  function changeHandler(
    val: string | Ingredient | Instruction,
    index: number
  ) {
    const newFields = [...fieldValue];
    newFields[index] = val;
    setFieldValue(newFields as string[] | Ingredient[] | Instruction[]);
    if (context === DynamicFieldContext.Ingredient) {
      onChange(newFields as Ingredient[]);
    } else if (context === DynamicFieldContext.Instruction) {
      onChange(newFields as Instruction[]);
    }
  }
  function removeField(e: React.MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault();
    const newFields = fieldValue.filter((_, i) => i !== index);
    setFieldValue(newFields as string[] | Ingredient[] | Instruction[]);
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
            onChange={(value: Ingredient) => changeHandler(value, index)}
          />
        );
      case DynamicFieldContext.Instruction:
        return (
          <InstructionComponent
            value={field as Instruction}
            onChange={(value: Instruction) => changeHandler(value, index)}
          />
        );

      default:
        return "text";
    }
  };
  return (
    <div className="flex flex-col gap-4">
      {fieldValue.map((field, index) => {
        return (
          <div>
            {renderContext(field, index)}
            <div>
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
          </div>
        );
      })}
      {error && <p>{error}</p>}
    </div>
  );
};

export const DynamicField = DynamicFieldComponent;

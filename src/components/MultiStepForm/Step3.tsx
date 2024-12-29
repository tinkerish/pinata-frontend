import { FC, useCallback } from "react";
import { Instruction, RecipeForm } from "../../types/form";
import { DynamicField } from "../DynamicFields";
import { DynamicFieldContext } from "../../types/common";

// Dynamic step-by-step instructions, including optional images for each step-> Step3
interface Step3Props {
  value: RecipeForm;
  onChange: React.Dispatch<React.SetStateAction<RecipeForm>>;
  formErrors: Record<string, string>;
}
const Step3: FC<Step3Props> = ({ value, onChange, formErrors }) => {
  const handleInstructionChange = useCallback(
    (val: Instruction[]) => {
      onChange((prev) => {
        return {
          ...prev,
          instructions: val,
        };
      });
    },
    [onChange]
  );

  return (
    <DynamicField
      value={value.instructions}
      context={DynamicFieldContext.Instruction}
      onChange={handleInstructionChange}
      error={formErrors}
    />
  );
};

export default Step3;

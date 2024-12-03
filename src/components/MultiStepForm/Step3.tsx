import { FC } from "react";
import {
  DynamicFieldContext,
  Instruction,
  RecipeForm,
} from "../../types/common";
import { DynamicField } from "../DynamicFields";

// Dynamic step-by-step instructions, including optional images for each step-> Step3
interface Step3Props {
  value: RecipeForm;
  onChange: React.Dispatch<React.SetStateAction<RecipeForm>>;
  formErrors: Record<string, string>;
}
const Step3: FC<Step3Props> = ({ value, onChange, formErrors }) => {
  const handleInstructionChange = (val: Instruction[]) => {
    onChange((prev) => {
      return {
        ...prev,
        instructions: val,
      };
    });
  };

  return (
    <DynamicField
      value={value.instructions}
      context={DynamicFieldContext.Instruction}
      onChange={handleInstructionChange}
      error={formErrors.instructions}
    />
  );
};

export default Step3;

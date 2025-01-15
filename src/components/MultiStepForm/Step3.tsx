import { useCallback } from "react";
import { Instruction } from "../../types/form";
import { DynamicField } from "../DynamicFields";
import { DynamicFieldContext } from "../../types/common";
import useFormStore from "../../store/formStore";

// Dynamic step-by-step instructions, including optional images for each step-> Step3
const Step3 = () => {
  const value = useFormStore((state) => state.formData);
  const formErrors = useFormStore((state) => state.formErrors);
  const onChange = useFormStore((state) => state.setFormData);
  const handleInstructionChange = useCallback(
    (val: Instruction[]) => {
      onChange({
        instructions: val,
      });
    },
    [onChange]
  );

  return (
    <DynamicField
      value={value.instructions}
      context={DynamicFieldContext.Instruction}
      onChange={handleInstructionChange}
      error={formErrors.instructions as string[]}
    />
  );
};

export default Step3;

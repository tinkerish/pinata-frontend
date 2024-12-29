import { FC, useEffect } from "react";
import { RecipeForm } from "../../types/form";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import StepsController from "./StepsController";
// import { checkErrors } from "../../utils/multiStepValidation";
// title, description, cuisine type, estimated cooking time, serving size, difficulty, cover image-> STep1
// Dynamic Ingredient name, quantity, measurement unit (e.g., grams, cups), and optional notes (like “finely chopped”)-> Step2
// Dynamic step-by-step instructions, including optional images for each step-> Step3

export interface MultiStepFormProps {
  id: string;
  ariaLabelledBy: string;
  formData: RecipeForm;
  formErrors?: Record<string, string>;
  onChange?: React.Dispatch<React.SetStateAction<RecipeForm>>;
  manageValidations?: (step: number) => boolean;
}
const MultiStepForm: FC<MultiStepFormProps> = ({
  id,
  ariaLabelledBy,
  formData,
  formErrors,
  manageValidations,
  onChange,
}) => {
  const steps = [
    <Step1 value={formData} onChange={onChange!} formErrors={formErrors!} />,
    <Step2 value={formData} onChange={onChange!} formErrors={formErrors!} />,
    <Step3 value={formData} onChange={onChange!} formErrors={formErrors!} />,
  ];
  return (
    <form
      id={id}
      aria-labelledby={ariaLabelledBy}
      className="flex max-h-full h-full"
    >
      <StepsController
        steps={steps}
        stepsAmount={3}
        manageValidations={manageValidations}
      />
    </form>
  );
};
export default MultiStepForm;

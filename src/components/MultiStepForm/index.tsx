import { FC } from "react";
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
  submitHandler: () => void;
}
const MultiStepForm: FC<MultiStepFormProps> = ({
  id,
  ariaLabelledBy,
  submitHandler,
}) => {
  const steps = [<Step1 />, <Step2 />, <Step3 />];
  return (
    <form
      id={id}
      aria-labelledby={ariaLabelledBy}
      className="flex max-h-full h-full"
    >
      <StepsController
        steps={steps}
        stepsAmount={3}
        submitHandler={submitHandler}
      />
    </form>
  );
};
export default MultiStepForm;

import { FC, useState } from "react";
import { FormValidation, RecipeForm } from "../../types/common";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import StepsController from "./StepsController";
import { checkErrors } from "../../utils/multiStepValidation";
// title, description, cuisine type, estimated cooking time, serving size, difficulty, cover image-> STep1
// Dynamic Ingredient name, quantity, measurement unit (e.g., grams, cups), and optional notes (like “finely chopped”)-> Step2
// Dynamic step-by-step instructions, including optional images for each step-> Step3

export interface MultiStepFormProps {
  id: string;
  ariaLabelledBy: string;
}
const MultiStepForm: FC<MultiStepFormProps> = ({ id, ariaLabelledBy }) => {
  const [formData, setFormData] = useState<RecipeForm>({
    title: "",
    description: "",
    cuisineType: "",
    estimatedCookingTime: {
      value: 0,
      qualifier: "minutes",
    },
    servingSize: 0,
    difficulty: "easy",
    coverImage: "",
    ingredients: [
      {
        name: "",
        quantity: 0,
        measurementUnit: "grams",
        notes: "",
      },
    ],
    instructions: [
      {
        instruction: "",
        image: "",
        video: "",
        tips: "",
      },
    ],
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({
    title: "",
    description: "",
    cuisineType: "",
    estimatedCookingTime: "",
    servingSize: "",
    difficulty: "",
    coverImage: "",
    ingredients: "",
    instructions: "",
  });
  const submitHandler = () => {
    setTimeout(() => {
      console.log("Form Data", formData);
    }, 1000);
  };
  const manageValidations = (step: number) => {
    const { errors, isErrors }: FormValidation = checkErrors(formData, step);

    if (!isErrors && step === 2) {
      submitHandler();
      return true;
    }
    if (!isErrors) {
      return true;
    }
    setFormErrors(errors);
    return false;
  };
  const steps = [
    <Step1 value={formData} onChange={setFormData} formErrors={formErrors} />,
    <Step2 value={formData} onChange={setFormData} formErrors={formErrors} />,
    <Step3 value={formData} onChange={setFormData} formErrors={formErrors} />,
  ];
  return (
    <form
      id={id}
      aria-labelledby={ariaLabelledBy}
      className="flex-grow flex flex-col"
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

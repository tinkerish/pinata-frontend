import { FC, useState } from "react";
import StepsIndicator from "./StepsIndicator";
interface StepsControllerProps {
  steps: React.ReactNode[];
  stepsAmount: number;
  manageValidations: (step: number) => boolean;
}
const StepsController: FC<StepsControllerProps> = ({
  steps,
  stepsAmount,
  manageValidations,
}) => {
  const [step, setStep] = useState(0);
  const [stepCompleted, setStepCompleted] = useState(steps.map(() => false));
  const nextStepHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!manageValidations(step)) {
      setStepCompleted((prev) => {
        const updated = [...prev];
        updated[step] = false;
        return updated;
      });
      return;
    }
    setStepCompleted((prev) => {
      const updated = [...prev];
      updated[step] = true;
      return updated;
    });
    if (step === 2) return;
    setStep((prev) => prev + 1);
  };
  const prevStepHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStep((prev) => prev - 1);
  };

  return (
    <div className="flex-grow flex flex-col -between">
      <div className="flex flex-col gap-8 flex-grow">
        <StepsIndicator
          stepsAmount={stepsAmount}
          completedSteps={stepCompleted}
        />
        {steps[step]}
      </div>
      <div>
        <button disabled={step === 0} onClick={(e) => prevStepHandler(e)}>
          Prev
        </button>
        <button onClick={(e) => nextStepHandler(e)}>
          {step === 2 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default StepsController;

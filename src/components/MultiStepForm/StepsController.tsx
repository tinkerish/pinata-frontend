import { FC, useState } from "react";
import StepsIndicator from "./StepsIndicator";
import food from "../../assets/file.png";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
interface StepsControllerProps {
  steps: React.ReactNode[];
  stepsAmount: number;
  manageValidations?: (step: number) => boolean;
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
    if (!manageValidations?.(step)) {
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
    <div className="flex-grow flex max-h-full h-full gap-2">
      <div className="sm:w-[59%] w-full flex flex-col justify-between gap-12">
        <div className="flex flex-col flex-grow-[0.5] w-full gap-8">
          <StepsIndicator
            stepsAmount={stepsAmount}
            completedSteps={stepCompleted}
          />
          {steps[step]}
        </div>
        <div className="flex justify-end gap-4 items-center">
          <button
            disabled={step === 0}
            onClick={(e) => prevStepHandler(e)}
            className={`bg-[#fdd901] hover:bg-[#d6b600] active:bg-[#b59a00] rounded active:shadow-[inset 0px 2px 4px rgba(0, 0, 0, 0.2)] transition-all text-lg px-4 py-1 flex items-center justify-center ${
              step === 0 && "cursor-not-allowed"
            }`}
          >
            <GrFormPrevious /> Prev
          </button>
          <button
            onClick={(e) => nextStepHandler(e)}
            className={`${
              step === 2
                ? "bg-black hover:bg-[#333333] active:bg-[#1a1a1a] text-[#fdd901]"
                : "bg-[#e3752c] hover:bg-[#ff8a42] active:bg-[#c06124] text-white"
            } active:shadow-[inset 0px 2px 4px rgba(0, 0, 0, 0.2)] transition-all rounded text-lg  px-4 py-1 flex items-center justify-center`}
          >
            {step === 2 ? (
              <>
                Submit <FaCheck />
              </>
            ) : (
              <>
                Next
                <GrFormNext />
              </>
            )}
          </button>
        </div>
      </div>
      <div className="sm:w-[39%] flex justify-center max-sm:collapse w-0">
        <img
          src={food}
          alt="food"
          className="w-full object-contain object-center"
        />
      </div>
    </div>
  );
};

export default StepsController;

import { FC, useMemo } from "react";

interface StepsIndicatorProps {
  stepsAmount: number;
  completedSteps: boolean[];
}
const StepsIndicator: FC<StepsIndicatorProps> = ({
  stepsAmount,
  completedSteps,
}) => {
  const stepsCompleted = useMemo(
    () => completedSteps.filter((step) => step === true).length,
    [completedSteps]
  );
  return (
    <div
      className="w-full flex justify-between md:gap-4 gap-2"
      role="progressbar"
      aria-valuenow={stepsCompleted}
      aria-valuemin={0}
      aria-valuemax={stepsAmount}
      aria-label="Steps Indicator"
    >
      {[...Array(stepsAmount)].map((_, index) => (
        <div
          className="w-full flex justify-between items-center md:gap-4 gap-2"
          key={index}
        >
          <div className="md:w-4 md:h-4 md:p-4 w-2 h-2 p-2 bg-[#e3752c] text-white font-extrabold rounded-full flex items-center justify-center">
            {index + 1}
          </div>
          <div
            className={`w-full border md:h-4 h-2 rounded-lg ${
              completedSteps[index] === true ? "bg-[#e3752c]" : "bg-gray-300"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default StepsIndicator;

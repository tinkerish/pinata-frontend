import { FC } from "react";

interface StepsIndicatorProps {
  stepsAmount: number;
  completedSteps: boolean[];
}
const StepsIndicator: FC<StepsIndicatorProps> = ({
  stepsAmount,
  completedSteps,
}) => {
  console.log("completedSteps", completedSteps);

  return (
    <div className="w-full flex justify-between gap-4">
      {[...Array(stepsAmount)].map((_, index) => (
        <div className="w-full flex justify-between items-center gap-4">
          <div
            key={index}
            className="w-4 h-4 p-4 bg-blue-600 text-white rounded-full flex items-center justify-center"
          >
            {index + 1}
          </div>
          <div
            className={`w-full border h-4 rounded-lg ${
              completedSteps[index] === true ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default StepsIndicator;

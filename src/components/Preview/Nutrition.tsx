import { MeasurementUnit, Nutrition } from "../../types/form";
import { FC } from "react";
import { FaNutritionix } from "react-icons/fa";
import { RiBowlLine } from "react-icons/ri";

interface NutritionValueProps {
  nutrition: Nutrition;
  servingSize: number;
}
const NutritionValue: FC<NutritionValueProps> = ({
  nutrition,
  servingSize,
}) => {
  return (
    <div className="pt-4 flex flex-col gap-4">
      <div className="flex items-center justify-between p-4 text-[#a1a1a1]">
        <div className="flex items-center gap-1 ">
          <RiBowlLine />
          <p>{servingSize} serve</p>
        </div>
        <p>{Object.keys(nutrition).length} items</p>
      </div>
      {Object.keys(nutrition).map((key) => {
        return (
          <NutritionItem title={key} nutrient={nutrition[key]} key={key} />
        );
      })}
    </div>
  );
};
interface NutritionItemProps {
  title: string;
  nutrient: MeasurementUnit | number;
}
const NutritionItem: FC<NutritionItemProps> = ({ nutrient, title }) => {
  return (
    <div className="flex items-center justify-between bg-[#ebebeb] p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-3">
        <FaNutritionix />
        <div className="flex items-center gap-1">
          <h3 className="font-extrabold">
            {title[0].toUpperCase()}
            {title.slice(1)}
          </h3>
        </div>
      </div>
      <p className="text-[#767676]">
        {typeof nutrient === "object"
          ? `${nutrient.value} ${nutrient.qualifier}`
          : `${nutrient}`}
      </p>
    </div>
  );
};

export default NutritionValue;

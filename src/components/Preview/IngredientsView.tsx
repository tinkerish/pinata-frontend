import { Ingredient as IngridientType } from "../../types/form";
import { FC } from "react";
import { RiBowlLine } from "react-icons/ri";
import { SiFoodpanda } from "react-icons/si";
interface IngredientsViewProps {
  ingredients: IngridientType[];
  servingSize: number;
}
const IngredientsView: FC<IngredientsViewProps> = ({
  ingredients,
  servingSize,
}) => {
  return (
    <div className="pt-4 flex flex-col gap-4">
      <div className="flex items-center justify-between p-4 text-[#a1a1a1]">
        <div className="flex items-center gap-1 ">
          <RiBowlLine />
          <p>{servingSize} serve</p>
        </div>
        <p>{ingredients.length} items</p>
      </div>
      {ingredients.map((ingredient, index) => {
        return <Ingredient key={index} ingredient={ingredient} />;
      })}
    </div>
  );
};
interface IngredientProps {
  ingredient: IngridientType;
}
const Ingredient: FC<IngredientProps> = ({ ingredient }) => {
  return (
    <div className="flex items-center justify-between bg-[#ebebeb] p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-3">
        <SiFoodpanda />
        <div className="flex items-center gap-1">
          {ingredient.name && (
            <h3 className="font-extrabold ">
              {ingredient.name[0].toUpperCase()}
              {ingredient.name.slice(1)}
            </h3>
          )}
          {ingredient.notes && (
            <p className="text-[#767676]">{`(${ingredient.notes})`}</p>
          )}
        </div>
      </div>
      <p className="text-[#767676]">
        {ingredient.quantity} {ingredient.measurementUnit}
      </p>
    </div>
  );
};

export default IngredientsView;

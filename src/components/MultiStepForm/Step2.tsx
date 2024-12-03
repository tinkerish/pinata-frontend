import { FC } from "react";
import {
  DynamicFieldContext,
  Ingredient,
  RecipeForm,
} from "../../types/common";
import { DynamicField } from "../DynamicFields";

// Dynamic Ingredient name, quantity, measurement unit (e.g., grams, cups), and optional notes (like “finely chopped”)-> Step2

interface Step2Props {
  value: RecipeForm;
  onChange: React.Dispatch<React.SetStateAction<RecipeForm>>;
  formErrors: Record<string, string>;
}
const Step2: FC<Step2Props> = ({ value, onChange, formErrors }) => {
  const handleIngredientChange = (val: Ingredient[]) => {
    onChange((prev) => {
      return {
        ...prev,
        ingredients: val,
      };
    });
  };

  return (
    <DynamicField
      value={value.ingredients}
      context={DynamicFieldContext.Ingredient}
      onChange={handleIngredientChange}
      error={formErrors.ingredients}
    />
  );
};

export default Step2;

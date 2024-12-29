import { FC, useCallback } from "react";
import { Ingredient, RecipeForm } from "../../types/form";
import { DynamicField } from "../DynamicFields";
import { DynamicFieldContext } from "../../types/common";

// Dynamic Ingredient name, quantity, measurement unit (e.g., grams, cups), and optional notes (like “finely chopped”)-> Step2

interface Step2Props {
  value: RecipeForm;
  onChange: React.Dispatch<React.SetStateAction<RecipeForm>>;
  formErrors: Record<string, string>;
}
const Step2: FC<Step2Props> = ({ value, onChange, formErrors }) => {
  const handleIngredientChange = useCallback(
    (val: Ingredient[]) => {
      onChange((prev) => {
        return {
          ...prev,
          ingredients: val,
        };
      });
    },
    [onChange]
  );

  return (
    <DynamicField
      value={value.ingredients}
      context={DynamicFieldContext.Ingredient}
      onChange={handleIngredientChange}
      error={formErrors}
    />
  );
};

export default Step2;

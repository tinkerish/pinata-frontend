import { useCallback } from "react";
import { Ingredient } from "../../types/form";
import { DynamicField } from "../DynamicFields";
import { DynamicFieldContext } from "../../types/common";
import useFormStore from "../../store/formStore";

// Dynamic Ingredient name, quantity, measurement unit (e.g., grams, cups), and optional notes (like “finely chopped”)-> Step2

// interface Step2Props {
// value: RecipeForm;
// onChange: React.Dispatch<React.SetStateAction<RecipeForm>>;
// formErrors: Record<string, string>;
// }
const Step2 = () => {
  const value = useFormStore((state) => state.formData);
  const formErrors = useFormStore((state) => state.formErrors);
  const onChange = useFormStore((state) => state.setFormData);
  const handleIngredientChange = useCallback(
    (val: Ingredient[]) => {
      onChange({
        ingredients: val,
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

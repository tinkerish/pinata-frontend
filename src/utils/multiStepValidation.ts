import { RecipeForm } from "../types/form";

const checkErrors = (formData: RecipeForm, step: number) => {
  console.log("formData", formData);
  const errors: Record<string, string> = {};
  switch (step) {
    case 0:
      if (!formData.title) {
        errors["title"] = "Title is required.";
      }
      if (!formData.description) {
        errors["description"] = "Description is required.";
      }
      if (!formData.cuisineType) {
        errors["cuisineType"] = "Cuisine Type is required.";
      }
      if (formData.estimatedCookingTime.value < 0) {
        errors["estimatedCookingTime"] =
          "Estimated Cooking Time should be a valid number.";
      }
      if (formData.servingSize < 0) {
        errors["servingSize"] = "Serving size should be a valid number.";
      }
      if (!formData.difficulty) {
        errors["difficulty"] = "Difficulty is required.";
      }
      if (!formData.coverImage) {
        errors["coverImage"] = "Cover Image is required.";
      }

      return {
        errors,
        isErrors: Object.keys(errors).length > 0,
      };
    case 1:
      for (const ingredient of formData.ingredients) {
        if (
          !ingredient.name ||
          ingredient.quantity < 0 ||
          !ingredient.measurementUnit
        ) {
          errors["ingredients"] =
            "Ingredient name and measurement is required.";
        }
      }
      return {
        errors,
        isErrors: Object.keys(errors).length > 0,
      };
    case 2:
      for (const instruction of formData.instructions) {
        if (!instruction.instruction) {
          errors["instructions"] = "Instruction is required.";
        }
      }
      return {
        errors,
        isErrors: Object.keys(errors).length > 0,
      };
    default:
      return {
        errors,
        isErrors: false,
      };
  }
};
export { checkErrors };

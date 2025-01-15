import { useCallback } from "react";
import { indexedDBStorage } from "../database/indexedDB";
import useFormStore from "../store/formStore";

const useClearFormData = () => {
  const resetFormData = useFormStore((state) => state.setFormData);
  const resetErrors = useFormStore((state) => state.setFormErrors);
  const clearFormData = useCallback(async () => {
    await indexedDBStorage.removeItem("formData");
    await indexedDBStorage.removeItem("formErrors");

    resetFormData({
      title: "",
      description: "",
      cuisineType: "",
      estimatedCookingTime: { value: 0, qualifier: "minutes" },
      servingSize: 0,
      difficulty: "easy",
      coverImage: undefined,
      ingredients: [
        { name: "", quantity: 0, measurementUnit: "grams", notes: "" },
      ],
      instructions: [
        { instruction: "", image: undefined, video: undefined, tips: "" },
      ],
      nutrition: {
        calories: 0,
        totalFat: {
          value: 0,
          qualifier: "g",
        },
        saturatedFat: {
          value: 0,
          qualifier: "g",
        },
        cholesterol: {
          value: 0,
          qualifier: "mg",
        },
        sodium: {
          value: 0,
          qualifier: "mg",
        },
        totalCarbohydrate: {
          value: 0,
          qualifier: "g",
        },
        dietaryFiber: {
          value: 0,
          qualifier: "g",
        },
        totalSugars: {
          value: 0,
          qualifier: "g",
        },
        protein: {
          value: 0,
          qualifier: "mg",
        },
        vitaminC: {
          value: 0,
          qualifier: "mg",
        },
        calcium: {
          value: 0,
          qualifier: "mg",
        },
        iron: {
          value: 0,
          qualifier: "mg",
        },
        potassium: {
          value: 0,
          qualifier: "mg",
        },
      },
    });
    resetErrors({
      title: "",
      description: "",
      cuisineType: "",
      estimatedCookingTime: "",
      servingSize: "",
      difficulty: "",
      coverImage: "",
      ingredients: [],
      instructions: [],
    });
  }, [resetFormData, resetErrors]);

  return clearFormData;
};

export default useClearFormData;

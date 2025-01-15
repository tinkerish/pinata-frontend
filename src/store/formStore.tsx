import { create, StateCreator } from "zustand";
import {
  Difficulty,
  FormValidation,
  Ingredient,
  RecipeForm,
} from "../types/form";
import { checkErrors } from "../utils/multiStepValidation";
import { persist } from "zustand/middleware";
import { indexedDBStorage } from "../database/indexedDB";
export interface FormStore {
  formData: RecipeForm;
  formErrors: Record<string, string | string[]>;
  setFormData: (data: Partial<RecipeForm>) => void;
  setFormErrors: (errors: Record<string, string | string[]>) => void;
  manageValidations: (step: number) => boolean;
}
// Calories 710
// Total Fat 36g	47%
// Saturated Fat 18g	88%
// Cholesterol 126mg	42%
// Sodium 1765mg	77%
// Total Carbohydrate 53g	19%
// Dietary Fiber 4g	16%
// Total Sugars 4g
// Protein 42g	84%
// Vitamin C 19mg	21%
// Calcium 509mg	39%
// Iron 5mg	30%
// Potassium
const formStore: StateCreator<FormStore> = (set, get) => ({
  formData: {
    title: "",
    description: "",
    cuisineType: "",
    estimatedCookingTime: {
      value: 0,
      qualifier: "minutes",
    },
    servingSize: 0,
    difficulty: "easy" as Difficulty,
    coverImage: undefined,
    ingredients: [
      {
        name: "",
        quantity: 0,
        measurementUnit: "grams",
        notes: "",
      },
    ] as Ingredient[],
    instructions: [
      {
        instruction: "",
        image: undefined,
        video: undefined,
        tips: "",
      },
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
  },
  formErrors: {
    title: "",
    description: "",
    cuisineType: "",
    estimatedCookingTime: "",
    servingSize: "",
    difficulty: "",
    coverImage: "",
    ingredients: [],
    instructions: [],
  },
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setFormErrors: (errors) => {
    set((state) => ({ formErrors: { ...state.formErrors, ...errors } }));
  },
  manageValidations: (step) => {
    const formData = get().formData;
    const { errors, isErrors }: FormValidation = checkErrors(formData, step);
    set(() => ({ formErrors: { ...errors } }));

    if (!isErrors) {
      return true;
    }
    if (!isErrors) {
      return true;
    }
    return false;
  },
});

const useFormStore = create(
  persist(formStore, {
    name: "recipe-form-data",
    storage: indexedDBStorage,
  })
);

export default useFormStore;

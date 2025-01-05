import { create, StateCreator } from "zustand";
import {
  Difficulty,
  FormValidation,
  Ingredient,
  RecipeForm,
} from "../types/form";
import { checkErrors } from "../utils/multiStepValidation";
interface FormStore {
  formData: RecipeForm;
  formErrors: Record<string, string>;
  setFormData: (data: Partial<RecipeForm>) => void;
  setFormErrors: (errors: Record<string, string>) => void;
  manageValidations: (step: number) => boolean;
}
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
    coverImage: "",
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
        image: "",
        video: "",
        tips: "",
      },
    ],
  },
  formErrors: {
    title: "",
    description: "",
    cuisineType: "",
    estimatedCookingTime: "",
    servingSize: "",
    difficulty: "",
    coverImage: "",
    ingredients: "",
    instructions: "",
  },
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setFormErrors: (errors) =>
    set((state) => ({ ...state.formErrors, ...errors })),
  manageValidations: (step) => {
    const formData = get().formData;
    const { errors, isErrors }: FormValidation = checkErrors(formData, step);

    if (!isErrors && step === 2) {
      return true;
    }
    if (!isErrors) {
      return true;
    }
    set((state) => ({ ...state.formErrors, ...errors }));
    return false;
  },
});

const useFormStore = create(formStore);

export default useFormStore;

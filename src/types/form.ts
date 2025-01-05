export interface MeasurementUnit {
  value: number;
  qualifier?: string | TimeQualifier | IngredientMeasurement;
}
type TimeQualifier = "minutes" | "hours";
export type Difficulty = "easy" | "medium" | "hard";
export type IngredientMeasurement =
  | "grams"
  | "cups"
  | "tablespoons"
  | "teaspoons"
  | "pounds"
  | "ounces"
  | "milliliters"
  | "liters"
  | "units"
  | "bowls"
  | "slices";

export interface Ingredient {
  name: string;
  quantity: number;
  measurementUnit: IngredientMeasurement;
  notes?: string;
}
export interface Instruction {
  instruction: string;
  image?: string;
  video?: string;
  tips?: string;
}
export interface RecipeForm {
  title: string;
  description: string;
  cuisineType: string;
  estimatedCookingTime: MeasurementUnit;
  servingSize: number;
  difficulty: Difficulty;
  coverImage: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

export interface FormValidation {
  errors: Record<string, string>;
  isErrors: boolean;
}
export enum FileUploadType {
  JPEG = "image/jpeg",
  JPG = "image/jpg",
  PNG = "image/png",
  GIF = "image/gif",
  MP4 = "video/mp4",
}

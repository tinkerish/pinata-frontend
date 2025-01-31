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
export interface FileMetaDataType {
  name: string;
  type: string;
  size: number;
  url: string;
}
export interface Instruction {
  instruction: string;
  image?: FileMetaDataType[];
  video?: FileMetaDataType;
  tips?: string;
}
export interface Nutrition {
  calories: number;
  totalFat: MeasurementUnit;
  saturatedFat: MeasurementUnit;
  cholesterol: MeasurementUnit;
  sodium: MeasurementUnit;
  totalCarbohydrate: MeasurementUnit;
  dietaryFiber: MeasurementUnit;
  totalSugars: MeasurementUnit;
  protein: MeasurementUnit;
  calcium: MeasurementUnit;
  iron: MeasurementUnit;
  potassium: MeasurementUnit;
  vitaminC: MeasurementUnit;
}
export interface RecipeForm {
  title: string;
  description: string;
  cuisineType: string;
  estimatedCookingTime: MeasurementUnit;
  servingSize: number;
  difficulty: Difficulty;
  coverImage?: FileMetaDataType;
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutrition: Nutrition;
}

export interface FormValidation {
  errors: Record<string, string | string[]>;
  isErrors: boolean;
}
export enum FileUploadType {
  JPEG = "image/jpeg",
  JPG = "image/jpg",
  PNG = "image/png",
  GIF = "image/gif",
  MP4 = "video/mp4",
}
export type UploadStatus = "success" | "error" | "uploading" | "idle" | null;

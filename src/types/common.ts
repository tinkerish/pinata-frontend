import { MultiStepFormProps } from "../components/MultiStepForm";
import { PreviewProps } from "../components/Preview";

export enum DynamicFieldContext {
  Ingredient = "ingredient",
  Instruction = "instruction",
  Text = "text",
}
export type TabComponent =
  | {
      title: string;
      component: React.LazyExoticComponent<React.FC<MultiStepFormProps>>;
      props: MultiStepFormProps;
    }
  | {
      title: string;
      component: React.LazyExoticComponent<React.FC<PreviewProps>>;
      props: PreviewProps;
    };

export enum ToggleType {
  Checkbox = "checkbox",
  Switch = "switch",
}
export interface fileValidationError {
  invalidFormat: string;
  fileSize: string;
  fileCount: string;
}

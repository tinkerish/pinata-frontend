import { FC } from "react";
import { RecipeForm } from "../types/form";

export interface PreviewProps {
  id: string;
  ariaLabelledBy: string;
  formData: RecipeForm;
}

const Preview: FC<PreviewProps> = ({ id, ariaLabelledBy }) => {
  return (
    <div id={id} aria-labelledby={ariaLabelledBy}>
      Preview
    </div>
  );
};

export default Preview;

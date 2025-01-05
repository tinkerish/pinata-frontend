import { FC } from "react";

export interface PreviewProps {
  id: string;
  ariaLabelledBy: string;
}

const Preview: FC<PreviewProps> = ({ id, ariaLabelledBy }) => {
  return (
    <div id={id} aria-labelledby={ariaLabelledBy}>
      Preview
    </div>
  );
};

export default Preview;

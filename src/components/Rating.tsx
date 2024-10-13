import { FC } from "react";
export interface RatingProps {
  rating?: number;
}
const RatingComponent: FC<RatingProps> = ({ rating = 0 }) => {
  return (
    <div className="flex items-center">
      <div className="ratings">
        <div className="empty-stars"></div>
        <div
          className="full-stars"
          style={{ width: `${(rating / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

// export const Rating =         (RatingComponent);
export const Rating = RatingComponent;

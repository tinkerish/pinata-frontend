import { FC, useState } from "react";

interface ListCardProps {
  name: string;
  owner: string;
  description: string;
  image: string;
  difficulty: string;
  cookTime: string;
  ratings: number;
  dietType: string;
  ingredients: string;
  servings: number;
  video: string;
}

interface RecipeByIdProps {
  data: ListCardProps;
}

const RatingComponent: FC<{ onRate: (rating: number) => void }> = ({
  onRate,
}) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
    onRate(rate);
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((rate) => (
        <span
          key={rate}
          onClick={() => handleRating(rate)}
          style={{ cursor: "pointer", color: rate <= rating ? "gold" : "gray" }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export const RecipeById: FC<RecipeByIdProps> = ({ data }) => {
  const [userRating, setUserRating] = useState<number | null>(null);

  const handleRate = (rating: number) => {
    setUserRating(rating);
    // Here you can send the rating to the backend server
    console.log(`User rated: ${rating}`);
  };

  return (
    <div>
      <div className="action">
        <RatingComponent onRate={handleRate} />
        {userRating && <div>Your rating: {userRating}</div>}
      </div>
      <div className="bg-white p-8 flex flex-col gap-4 shadow-lg rounded-md">
        <div className="text-2xl font-bold">{data.name}</div>
        <div className="text-lg">{data.owner}</div>
        <div className="text-lg">{data.description}</div>
        <div className="text-lg">
          <img src={data.image} alt="food" />
        </div>
        <div className="text-lg">{data.difficulty}</div>
        <div className="text-lg">{data.cookTime}</div>
        <div className="text-lg">{data.ratings}</div>
        <div className="text-lg">{data.dietType}</div>
        <div className="text-lg">{data.ingredients}</div>
        <div className="text-lg">{data.servings}</div>
        <div className="text-lg">
          <video src={data.video} controls></video>
        </div>
      </div>
    </div>
  );
};

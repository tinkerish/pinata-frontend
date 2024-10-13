import { FC, useState } from "react";
import { ListCardProps } from "./ListCard";
import { useAuth } from "../hooks/useAuth";
import { Seperator } from "./SeperatorLine";
import veg from "../assets/veg.png";
import nonVeg from "../assets/non-veg.png";
interface RecipeByIdProps {
  data: ListCardProps;
  rateRecipe: (recipeId: string, rating: number, userId: string) => void;
}

const RatingComponent: FC<{
  onRate: (rating: number) => void;
  value: number | 0;
}> = ({ onRate, value }) => {
  const [rating, setRating] = useState(value);
  const handleRating = (rate: number) => {
    setRating(rate);
    console.log(rate);

    onRate(rate);
  };

  return (
    <div className="rating ">
      {[1, 2, 3, 4, 5].map((rate) => (
        <span
          key={rate}
          onClick={() => handleRating(rate)}
          style={{
            cursor: "pointer",
            color: rate <= rating ? "#ff8573" : "#a4a5af",
            fontSize: "1.5rem",
            WebkitTextStroke: "1.5px #ff2100",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export const RecipeById: FC<RecipeByIdProps> = ({ data, rateRecipe }) => {
  const { id } = useAuth();
  const handleRate = (rating: number) => {
    rateRecipe(data._id, rating, id!);
  };

  return (
    <div>
      <div className=" p-8 flex flex-col gap-4 shadow-lg rounded-md items-center">
        <div className="text-4xl font-bold capitalize">{data.name}</div>
        <div className="text-4xl font-bold capitalize">{data.description}</div>

        <div className="flex items-center gap-4">
          <div className="text-lg">{data.cookTime} minutes</div>
          <Seperator />
          <div className="text-lg">{data.difficulty}</div>
          <Seperator />
          <div className="text-lg">{data.servings} person</div>
          <Seperator />
          <div className="text-lg capitalize">By ~{data.ownerName}</div>
          <Seperator />
          {data.dietType === "Vegetarian" ? (
            <img src={veg} alt="veg" className="w-7" />
          ) : (
            <img src={nonVeg} alt="nonVeg" className="w-7" />
          )}
          <Seperator />
          <RatingComponent onRate={handleRate} value={data.averageRating} />
        </div>
        <div
          className="text-lg w-[70%] shadow-xl border-8 border-solid border-black  text-[black] p-10 overflow-y-scroll flex flex-col h-[500px] gap-4 rounded-md"
          style={{
            scrollbarWidth: "none",
            scrollbarColor: "#ff8573 #f5f5f5",
          }}
        >
          <p className="uppercase text-xl font-semibold">Ingredients</p>
          <div className="flex flex-col gap-2">
            {data.ingredients.map((ingredient) => (
              <>
                <div key={ingredient} className="text-lg capitalize pl-2">
                  {ingredient}
                </div>
                <hr className="border-[1px] h-0 border-dotted border-[#8a8a89]" />
              </>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between w-full p-16">
          <div className="flex w-[40%] flex-col items-center ">
            <video
              src={data.video}
              controls
              className="w-full h-auto aspect-video rounded-md shadow-xl"
            ></video>
          </div>
          <div className="flex w-[40%] flex-col items-center">
            <img
              src={data.image}
              alt="food"
              className="w-full h-auto object-center rounded-md aspect-video shadow-xl"
            />
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.recipe }}></div>
      </div>
    </div>
  );
};

import { FC, lazy, useMemo, useState } from "react";
import useFormStore from "../../store/formStore";
import { Tabs } from "../Tabs";
import { GiSandsOfTime } from "react-icons/gi";
import Avatar from "../Avatar.tsx";
import userImg from "../../assets/food_back.jpg";
import LocationMap from "../Location.tsx";
export interface PreviewProps {
  id: string;
  ariaLabelledBy: string;
}
const IngrientsView = lazy(() => import("./IngredientsView.tsx"));
const InstructionView = lazy(() => import("./InstructionView.tsx"));
const NutritionValue = lazy(() => import("./Nutrition.tsx"));
const Preview: FC<PreviewProps> = ({ id, ariaLabelledBy }) => {
  const formData = useFormStore((state) => state.formData);
  const [tab, setTab] = useState(0);
  const tabChangeHandler = (index: number) => {
    setTab(index);
  };
  const tabs = useMemo(() => {
    return [
      {
        title: "Ingredients",
        component: IngrientsView,
        props: {
          id: "tabpanel",
          ariaLabelledBy: "tab",
          ingredients: formData.ingredients,
          servingSize: formData.servingSize,
        },
      },
      {
        title: "Instructions",
        component: InstructionView,
        props: {
          id: "tabpanel",
          ariaLabelledBy: "tab",
          instructions: formData.instructions,
          servingSize: formData.servingSize,
        },
      },
      {
        title: "Nutrition",
        component: NutritionValue,
        props: {
          id: "tabpanel",
          ariaLabelledBy: "tab",
          nutrition: formData.nutrition,
          servingSize: formData.servingSize,
        },
      },
    ];
  }, [
    formData.ingredients,
    formData.nutrition,
    formData.servingSize,
    formData.instructions,
  ]);
  return (
    <div
      id={id}
      aria-labelledby={ariaLabelledBy}
      className="w-full flex flex-col gap-10"
    >
      <div className="w-full relative">
        {formData.coverImage?.url && (
          <img
            src={formData.coverImage.url}
            alt={formData.title}
            className="aspect-[18/9] w-full object-fill"
          />
        )}
        {formData.estimatedCookingTime && (
          <div className="flex items-end justify-end p-4 absolute right-0 bottom-0 z-10 gap-1 text-white w-full h-full shadow-[inset_0px_0px_100px_25px_rgba(0,0,0,0.75)]">
            <div className="flex items-center gap-1 text-xl">
              <GiSandsOfTime />
              <p>{formData.estimatedCookingTime.value}</p>
              <p>{formData.estimatedCookingTime.qualifier}</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start px-4">
        <div className="flex flex-col gap-1">
          {formData.title && (
            <h1 className="text-2xl font-extrabold">{formData.title}</h1>
          )}
          <div className="flex gap-2 mt-2">
            <span className="bg-[#e2e8f0] text-[#2d3748] px-2 py-1 rounded-md text-sm">
              {formData.cuisineType}
            </span>
            <span className="bg-[#e2e8f0] text-[#2d3748] px-2 py-1 rounded-md text-sm">
              {formData.difficulty}
            </span>
          </div>
        </div>
        <p className="text-[#a1a1a1]">(13K Reviews)</p>
      </div>
      <div className="px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar imageUrl={userImg} username="Priya Pandey" />
          <div className="flex flex-col">
            <p className="font-bold">Priya Pandey</p>
            <LocationMap city="Asansol" country="India" />
          </div>
        </div>
        <button className="bg-[#e3752c] text-white p-2 px-4 rounded-md ">
          Follow
        </button>
      </div>
      <div className="px-4 w-full">
        <hr className="h-[1px] border-none bg-[#a1a1a1]" />
      </div>
      <div className="px-4">
        {formData.description && <p>{formData.description}</p>}
      </div>
      <div className="w-full">
        <Tabs
          tabHeaderClassName="justify-between gap-0"
          tabClassName="flex-1"
          tabs={tabs}
          value={tab}
          onChange={tabChangeHandler}
          fullWidth={true}
        />
      </div>
    </div>
  );
};

export default Preview;

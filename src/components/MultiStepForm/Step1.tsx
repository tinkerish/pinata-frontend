import React, { FC } from "react";
import { RecipeForm } from "../../types/form";
import Select from "../Select";
import Error from "../Error";

// title, description, cuisine type, estimated cooking time, serving size, difficulty, cover image-> STep1
const DIFFICULTY_OPTIONS = [
  {
    value: "easy",
    name: "Easy",
  },
  {
    value: "medium",
    name: "Medium",
  },
  {
    value: "hard",
    name: "Hard",
  },
];
const COOK_TIME_OPTIONS = [
  {
    value: "minutes",
    name: "Minutes",
  },
  {
    value: "hours",
    name: "Hours",
  },
];
interface Step1Props {
  value: RecipeForm;
  onChange: React.Dispatch<React.SetStateAction<RecipeForm>>;
  formErrors: Record<string, string>;
}
const Step1: FC<Step1Props> = ({ value, onChange, formErrors }) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    onChange((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleCookTimeChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    onChange((prev) => {
      return {
        ...prev,
        estimatedCookingTime: {
          ...prev.estimatedCookingTime,
          [name]: value,
        },
      };
    });
  };
  return (
    <div className="w-full flex-grow flex">
      <div className="flex flex-col justify-evenly flex-grow w-full gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" hidden>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={value.title}
            placeholder="Enter your recipe title here"
            onChange={handleChange}
            className="md:text-3xl text-xl font-bold w-full focus:outline-none"
          />
          {formErrors.title && <Error errorMessage={formErrors.title} />}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" hidden>
            Description
          </label>
          <input
            id="description"
            name="description"
            value={value.description}
            onChange={handleChange}
            placeholder="Small description of your recipe"
            className="md:text-xl w-full focus:outline-none"
          />
          {formErrors.description && (
            <Error errorMessage={formErrors.description} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cuisineType" className="md:text-lg">
            Cuisine Type
          </label>
          <input
            type="text"
            id="cuisineType"
            name="cuisineType"
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 md:p-1 p-[]"
            value={value.cuisineType}
            onChange={handleChange}
          />
          {formErrors.cuisineType && (
            <Error errorMessage={formErrors.cuisineType} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className=" flex flex-col gap-1">
            <label htmlFor="estimatedCookingTime" className="md:text-lg">
              Estimated Cooking Time
            </label>
            <div className="flex rounded-lg items-center gap-1 w-full">
              <input
                type="number"
                id="estimatedCookingTime"
                name="value"
                className=" focus:outline-gray-500 md:p-1 border border-solid border-gray-400 w-[70%] rounded-lg"
                value={value.estimatedCookingTime.value}
                onChange={handleCookTimeChange}
              />
              <Select
                label="Cook Time"
                labelHidden={true}
                name="qualifier"
                onChange={handleCookTimeChange}
                options={COOK_TIME_OPTIONS}
                value={value.estimatedCookingTime.qualifier!}
                inputClassName="focus:outline-gray-500 md:p-[0.4rem] border border-solid border-gray-400 w-full rounded-lg"
                className="w-[29%]"
              />
            </div>
          </div>
          {formErrors.estimatedCookingTime && (
            <Error errorMessage={formErrors.estimatedCookingTime} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="servingSize" className="md:text-lg">
            Serving Size
          </label>
          <input
            type="number"
            id="servingSize"
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 md:p-1"
            name="servingSize"
            value={value.servingSize}
            onChange={handleChange}
          />
          {formErrors.servingSize && (
            <Error errorMessage={formErrors.servingSize} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Select
            label="Difficulty"
            name="difficulty"
            onChange={handleChange}
            options={DIFFICULTY_OPTIONS}
            value={value.difficulty}
            className="flex flex-col gap-1"
            inputClassName="focus:outline-gray-500 md:p-[0.4rem] rounded-lg border border-solid border-gray-400 rounded-lg"
            labelClassName="md:text-lg"
          />
          {formErrors.difficulty && (
            <Error errorMessage={formErrors.difficulty} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="coverImage" className="md:text-lg">
            Cover Image
          </label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 md:p-1"
            value={value.coverImage}
            onChange={handleChange}
          />
          {formErrors.coverImage && (
            <Error errorMessage={formErrors.coverImage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1;

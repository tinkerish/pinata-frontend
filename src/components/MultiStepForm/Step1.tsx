import React, { FC } from "react";
import { RecipeForm } from "../../types/common";
import Select from "../Select";

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
    <div className="flex flex-col flex-grow justify-evenly">
      <div>
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
          className="text-4xl font-bold w-full focus:outline-none"
        />
        {formErrors.title && <p>{formErrors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" hidden>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={value.description}
          onChange={handleChange}
          placeholder="Small description of your recipe"
          className="text-xl w-full focus:outline-none"
        />
        {formErrors.description && <p>{formErrors.description}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="cuisineType">Cuisine Type</label>
        <input
          type="text"
          id="cuisineType"
          name="cuisineType"
          className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 p-1"
          value={value.cuisineType}
          onChange={handleChange}
        />
        {formErrors.cuisineType && <p>{formErrors.cuisineType}</p>}
      </div>
      <div className="flex flex-col">
        <div className=" ">
          <label htmlFor="estimatedCookingTime" className="">
            Estimated Cooking Time
          </label>
          <div className="flex rounded-lg items-center gap-1">
            <input
              type="number"
              min={0}
              id="estimatedCookingTime"
              name="value"
              className=" focus:outline-gray-500 p-1 border border-solid border-gray-400"
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
              inputClassName="focus:outline-gray-500 p-[0.4rem] border border-solid border-gray-400"
            />
          </div>
        </div>
        {formErrors.estimatedCookingTime && (
          <p>{formErrors.estimatedCookingTime}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="servingSize">Serving Size</label>
        <input
          type="number"
          id="servingSize"
          className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 p-1"
          name="servingSize"
          value={value.servingSize}
          onChange={handleChange}
        />
        {formErrors.servingSize && <p>{formErrors.servingSize}</p>}
      </div>
      <div className="flex flex-col">
        <Select
          label="Difficulty"
          name="difficulty"
          onChange={handleChange}
          options={DIFFICULTY_OPTIONS}
          value={value.difficulty}
          className="flex flex-col"
          inputClassName="focus:outline-gray-500 p-[0.4rem] rounded-lg border border-solid border-gray-400"
        />
        {formErrors.difficulty && <p>{formErrors.difficulty}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="coverImage">Cover Image</label>
        <input
          type="text"
          id="coverImage"
          name="coverImage"
          className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 p-1"
          value={value.coverImage}
          onChange={handleChange}
        />
        {formErrors.coverImage && <p>{formErrors.coverImage}</p>}
      </div>
    </div>
  );
};

export default Step1;

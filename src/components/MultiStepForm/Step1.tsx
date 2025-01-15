import React, { useRef } from "react";
import Select from "../Select";
import Error from "../Error";
import useFormStore from "../../store/formStore";
import FileUploader, { FileUploaderHandle } from "../FileUploader";
import { FileMetaDataType } from "../../types/form";

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
const MAX_SIZE = "5 MB";
const FILE_TYPE = ["image/jpeg", "image/jpg", "image/png"];
const Step1 = () => {
  const value = useFormStore((state) => state.formData);
  const formErrors = useFormStore((state) => state.formErrors);
  const onChange = useFormStore((state) => state.setFormData);
  const uploadRef = useRef<FileUploaderHandle>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    onChange({
      [name]: value,
    });
  };
  const handleCookTimeChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value: timeVal } = e.target;
    onChange({
      estimatedCookingTime: {
        ...value.estimatedCookingTime,
        [name]: timeVal,
      },
    });
  };
  const handleFileChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (uploadRef.current) {
      const file = uploadRef.current.returnFiles();
      if (Array.isArray(file)) {
        onChange({
          coverImage: undefined,
        });
        return;
      }
      onChange({
        coverImage: file as FileMetaDataType,
      });
    }
  };
  return (
    <div className="w-full flex-grow flex">
      <div className="flex flex-col justify-evenly flex-grow w-full gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="sr-only">
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
            aria-label="Recipe Title"
            aria-invalid={!!formErrors.title}
            aria-describedby={formErrors.title ? "title-error" : undefined}
          />
          <div aria-live="assertive">
            {formErrors.title && (
              <Error id="title-error" errorMessage={formErrors.title} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="sr-only">
            Description
          </label>
          <input
            id="description"
            name="description"
            value={value.description}
            onChange={handleChange}
            placeholder="Small description of your recipe"
            className="md:text-xl w-full focus:outline-none"
            aria-label="Recipe Title"
            aria-invalid={!!formErrors.description}
            aria-describedby={
              formErrors.description ? "description-error" : undefined
            }
          />
          <div aria-live="assertive">
            {formErrors.description && (
              <Error
                id="description-error"
                errorMessage={formErrors.description}
              />
            )}
          </div>
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
            aria-invalid={!!formErrors.cuisineType}
            aria-describedby={
              formErrors.cuisineType ? "cuisineType-error" : undefined
            }
          />
          <div aria-live="assertive">
            {formErrors.cuisineType && (
              <Error
                id="cuisineType-error"
                errorMessage={formErrors.cuisineType}
              />
            )}
          </div>
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
                aria-invalid={!!formErrors.estimatedCookingTime}
                aria-describedby={
                  formErrors.estimatedCookingTime
                    ? "estimatedCookingTime-error"
                    : undefined
                }
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
                aria-invalid={!!formErrors.estimatedCookingTime}
                aria-describedby={
                  formErrors.estimatedCookingTime
                    ? "estimatedCookingTime-error"
                    : undefined
                }
              />
            </div>
          </div>
          <div aria-live="assertive">
            {formErrors.estimatedCookingTime && (
              <Error
                id="estimatedCookingTime-error"
                errorMessage={formErrors.estimatedCookingTime}
              />
            )}
          </div>
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
            aria-invalid={!!formErrors.servingSize}
            aria-describedby={
              formErrors.servingSize ? "servingSize-error" : undefined
            }
          />
          <div aria-live="assertive">
            {formErrors.servingSize && (
              <Error
                id="servingSize-error"
                errorMessage={formErrors.servingSize}
              />
            )}
          </div>
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
            aria-invalid={!!formErrors.difficulty}
            aria-describedby={
              formErrors.difficulty ? "difficulty-error" : undefined
            }
          />
          <div aria-live="assertive">
            {formErrors.difficulty && (
              <Error
                id="difficulty-error"
                errorMessage={formErrors.difficulty}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="coverImage" className="md:text-lg">
            Cover Image
          </label>
          <FileUploader
            multiple={false}
            value={value.coverImage}
            allowedFileSize={MAX_SIZE}
            allowedFileTypes={FILE_TYPE}
            maxFiles={1}
            ref={uploadRef}
          />
          <button className="w-fit" onClick={(e) => handleFileChange(e)}>
            {value.coverImage ? "Edit" : "Add"} Image
          </button>
          <div aria-live="assertive">
            {formErrors.coverImage && (
              <Error
                id="coverImage-error"
                errorMessage={formErrors.coverImage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;

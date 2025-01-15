import React from "react";
import useFormStore from "../../store/formStore";

const Step4 = () => {
  const value = useFormStore((state) => state.formData);
  const onChange = useFormStore((state) => state.setFormData);

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

  return (
    <div className="w-full flex-grow flex">
      <div className="flex flex-col justify-evenly flex-grow w-full gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="sr-only">
            Calories
          </label>
          <input
            type="number"
            min={0}
            id="calories"
            name="calories"
            value={value.nutrition.calories}
            placeholder="Enter your calories count here"
            onChange={handleChange}
            className="md:text-3xl text-xl font-bold w-full focus:outline-none"
            aria-label="Calories Count"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="sr-only">
            Total Fat
          </label>
          <input
            type="number"
            min={0}
            id="totalFat"
            name="totalFat"
            value={value.nutrition.totalFat.value}
            onChange={handleChange}
            placeholder="Enter your total fat here in grams"
            className="md:text-xl w-full focus:outline-none"
            aria-label="Total Fat"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cuisineType" className="md:text-lg">
            Saturated Fat
          </label>
          <input
            type="number"
            min={0}
            id="saturatedFat"
            name="saturatedFat"
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 md:p-1 p-[]"
            value={value.nutrition.saturatedFat.value}
            onChange={handleChange}
            aria-label="Saturated Fat"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cuisineType" className="md:text-lg">
            Cholesterol
          </label>
          <input
            type="number"
            min={0}
            id="cholesterol"
            name="cholesterol"
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 md:p-1 p-[]"
            value={value.nutrition.cholesterol.value}
            onChange={handleChange}
            aria-label="Cholesterol"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cuisineType" className="md:text-lg">
            Sodium
          </label>
          <input
            type="number"
            min={0}
            id="sodium"
            name="sodium"
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 md:p-1 p-[]"
            value={value.nutrition.sodium.value}
            onChange={handleChange}
            aria-label="Sodium"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cuisineType" className="md:text-lg">
            Total Carbohydrate
          </label>
          <input
            type="number"
            min={0}
            id="totalCarbohydrate"
            name="totalCarbohydrate"
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 md:p-1 p-[]"
            value={value.nutrition.totalCarbohydrate.value}
            onChange={handleChange}
            aria-label="Total Carbohydrate"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cuisineType" className="md:text-lg">
            Dietary Fiber
          </label>
          <input
            type="number"
            min={0}
            id="dietaryFiber"
            name="dietaryFiber"
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 md:p-1 p-[]"
            value={value.nutrition.dietaryFiber.value}
            onChange={handleChange}
            aria-label="Dietary Fiber"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cuisineType" className="md:text-lg">
            Total Sugars
          </label>
          <input
            type="number"
            min={0}
            id="totalSugars"
            name="totalSugars"
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 md:p-1 p-[]"
            value={value.nutrition.totalSugars.value}
            onChange={handleChange}
            aria-label="Total Sugars"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cuisineType" className="md:text-lg">
            Protein
          </label>
          <input
            type="number"
            min={0}
            id="protein"
            name="protein"
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 md:p-1 p-[]"
            value={value.nutrition.protein.value}
            onChange={handleChange}
            aria-label="Protein"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cuisineType" className="md:text-lg">
            Vitamin C
          </label>
          <input
            type="number"
            min={0}
            id="vitaminC"
            name="vitaminC"
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 md:p-1 p-[]"
            value={value.nutrition.vitaminC.value}
            onChange={handleChange}
            aria-label="Vitamin C"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cuisineType" className="md:text-lg">
            Calcium
          </label>
          <input
            type="number"
            min={0}
            id="calcium"
            name="calcium"
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 md:p-1 p-[]"
            value={value.nutrition.calcium.value}
            onChange={handleChange}
            aria-label="Calcium"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cuisineType" className="md:text-lg">
            Iron
          </label>
          <input
            type="number"
            min={0}
            id="iron"
            name="iron"
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 md:p-1 p-[]"
            value={value.nutrition.iron.value}
            onChange={handleChange}
            aria-label="Iron"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cuisineType" className="md:text-lg">
            Potassium
          </label>
          <input
            type="number"
            min={0}
            id="potassium"
            name="potassium"
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 md:p-1 p-[]"
            value={value.nutrition.potassium.value}
            onChange={handleChange}
            aria-label="Potassium"
          />
        </div>
      </div>
    </div>
  );
};

export default Step4;

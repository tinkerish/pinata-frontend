import { FC } from "react";
import { Ingredient } from "../../types/form";
import Select from "../Select";
import { RiInformationFill } from "react-icons/ri";
import Error from "../Error";
const MeasurementOptions = [
  { value: "grams", name: "Grams" },
  { value: "cups", name: "Cups" },
  { value: "tablespoons", name: "Tablespoons" },
  { value: "teaspoons", name: "Teaspoons" },
  { value: "pounds", name: "Pounds" },
  { value: "ounces", name: "Ounces" },
  { value: "milliliters", name: "Milliliters" },
  { value: "liters", name: "Liters" },
  { value: "units", name: "Units" },
  { value: "bowls", name: "Bowls" },
  { value: "slices", name: "Slices" },
];
interface IngredientComponentProps {
  value: Ingredient;
  onChange: (value: Ingredient, index: number) => void;
  index: number;
  error?: string;
}
const IngredientComponent: FC<IngredientComponentProps> = ({
  value,
  onChange,
  index,
  error,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value: inputVal } = e.target;
    onChange(
      {
        ...value,
        [name]: inputVal,
      },
      index
    );
  };
  return (
    <div className="w-[80%] flex flex-col gap-2">
      <div className="flex gap-1 items-center w-full">
        <div className="flex flex-col gap-1 w-[70%]">
          <label htmlFor="ingredient-name" className="md:text-lg text-sm">
            Ingredient Name
          </label>
          <input
            type="text"
            id="ingredient-name"
            name="name"
            value={value.name}
            onChange={handleChange}
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 w-full"
            aria-label="Ingredient Name"
            aria-invalid={!!error}
            aria-describedby={error ? `ingredient-error-${index}` : undefined}
          />
        </div>
        <div className="flex flex-col gap-1 w-[29%]">
          <label
            htmlFor="ingredient-notes"
            className="md:text-lg flex items-center gap-1  text-sm"
          >
            Notes{" "}
            <span className="relative group">
              <RiInformationFill size={20} />
              <p className="absolute hidden group-hover:block text-sm rounded shadow-inner border border-black bottom-full left-full whitespace-nowrap py-1 px-2 text-center bg-white">
                This field is optional
              </p>
            </span>
          </label>
          <input
            type="text"
            id="ingredient-notes"
            name="notes"
            value={value.notes}
            onChange={handleChange}
            className="border border-solid border-gray-400 rounded-lg focus:outline-gray-500 w-full"
            aria-label="Notes"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="ingredient-quantity" className="md:text-lg  text-sm">
          Quantity
        </label>
        <div className="flex rounded-lg items-center gap-1 w-full">
          <input
            type="number"
            id="ingredient-quantity"
            name="quantity"
            value={value.quantity}
            className=" focus:outline-gray-500 border border-solid border-gray-400 w-[70%] rounded-lg"
            onChange={handleChange}
            aria-label="Quantity"
            aria-invalid={!!error}
            aria-describedby={error ? `ingredient-error-${index}` : undefined}
          />
          <Select
            label={"Measurement Unit"}
            labelHidden={true}
            name={"measurementUnit"}
            onChange={handleChange}
            options={MeasurementOptions}
            value={value.measurementUnit}
            inputClassName="focus:outline-gray-500 border border-solid border-gray-400 w-full rounded-lg py-[1.865px]"
            className="w-[29%]"
          />
        </div>
        <div aria-live="assertive">
          {error && (
            <Error errorMessage={error} id={`ingredient-error-${index}`} />
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientComponent;

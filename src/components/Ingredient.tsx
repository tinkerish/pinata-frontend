import { FC } from "react";
import { Ingredient } from "../types/common";
import Select from "./Select";
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
  onChange: (value: Ingredient) => void;
}
const IngredientComponent: FC<IngredientComponentProps> = ({
  value,
  onChange,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value: inputVal } = e.target;
    onChange({
      ...value,
      [name]: inputVal,
    });
  };
  return (
    <div>
      <div>
        <label htmlFor="ingredient-name">Ingredient Name</label>
        <input
          type="text"
          id="ingredient-name"
          name="name"
          value={value.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="ingredient-quantity">Quantity</label>
        <input
          type="number"
          id="ingredient-quantity"
          name="quantity"
          value={value.quantity}
          onChange={handleChange}
        />
      </div>
      <div>
        <Select
          label={"Measurement Unit"}
          name={"measurementUnit"}
          onChange={handleChange}
          options={MeasurementOptions}
          value={value.measurementUnit}
        />
      </div>
      <div>
        <label htmlFor="ingredient-notes">Notes</label>
        <input
          type="text"
          id="ingredient-notes"
          name="notes"
          value={value.notes}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default IngredientComponent;

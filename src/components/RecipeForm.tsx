import { FC, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnNumberedList,
  BtnRedo,
  BtnUnderline,
  BtnUndo,
  ContentEditableEvent,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import { DynamicField } from "./DynamicFields";
import { pinata } from "../configs/pinata";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "./Loader";
import { ListCardProps } from "./ListCard";
import "./recipeForm.css";
interface RecipeFormProps {
  data: ListCardProps | null;
}
const RecipeFormComponent: FC<RecipeFormProps> = ({ data }) => {
  const [recipeValue, setRecipeValue] = useState(data?.recipe || "");
  const [fields, setFields] = useState<string[]>(data?.ingredients || [""]);
  const [name, setName] = useState(data?.name || "");
  const [description, setDescription] = useState(data?.description || "");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [servings, setServings] = useState(data?.servings || 0);
  const [cookTime, setCookTime] = useState(data?.cookTime || 0);
  const [difficulty, setDifficulty] = useState(data?.difficulty || "Easy");
  const [dietType, setDietType] = useState(data?.dietType || "Vegetarian");
  const [errors, setErrors] = useState({
    dietType: "",
    recipeValue: "",
    image: "",
    video: "",
    name: "",
    description: "",
    fields: "",
  });
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  function onNameChange(e: ContentEditableEvent) {
    setErrors({ ...errors, name: "" });
    setName(e.target.value);
  }
  function onDescriptionChange(e: ContentEditableEvent) {
    setErrors({ ...errors, description: "" });
    setDescription(e.target.value);
  }
  function onImageChange(file: FileList | null) {
    setErrors({ ...errors, image: "" });
    if (file && file[0]) setImage(file[0]);
  }
  function onVideoChange(file: FileList | null) {
    setErrors({ ...errors, video: "" });
    if (file && file[0]) setVideo(file[0]);
  }
  function onServingsChange(e: ContentEditableEvent) {
    setServings(parseInt(e.target.value));
  }
  function onCookTimeChange(e: ContentEditableEvent) {
    setCookTime(parseInt(e.target.value));
  }
  function onDifficultyChange(e: ContentEditableEvent) {
    setDifficulty(e.target.value);
  }
  function onDietTypeChange(e: ContentEditableEvent) {
    setDietType(e.target.value);
  }

  function onRecipeValueChange(e: ContentEditableEvent) {
    setErrors({ ...errors, recipeValue: "" });
    setRecipeValue(e.target.value);
  }
  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    const newErrors = {
      dietType: dietType ? "" : "Diet type is required",
      recipeValue: recipeValue ? "" : "Recipe value is required",
      image: image || data?.image ? "" : "Image is required",
      video: video || data?.video ? "" : "Video is required",
      name: name ? "" : "Name is required",
      description: description ? "" : "Description is required",
      fields: fields.every((field) => field.trim() !== "")
        ? ""
        : "No field can be empty",
    };
    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }
    try {
      setLoading(true);
      let signedUrl: string | undefined;
      let signedUrl2: string | undefined;
      if (image) {
        const upload1 = await pinata.upload.file(image!);
        signedUrl = await pinata.gateways.createSignedURL({
          cid: upload1.cid,
          expires: 604800,
        });
      }
      if (video) {
        const upload2 = await pinata.upload.file(video!);
        signedUrl2 = await pinata.gateways.createSignedURL({
          cid: upload2.cid,
          expires: 604800,
        });
      }
      const resp = await axios.post(
        data
          ? `https://pinata-backend.onrender.com/recipe/update-recipe/${data._id}`
          : "https://pinata-backend.onrender.com/recipe/create-recipe",
        {
          name,
          description,
          image: signedUrl ? signedUrl : data?.image ? data.image : "",
          video: signedUrl2 ? signedUrl2 : data?.video ? data.video : "",
          servings,
          cookTime,
          difficulty,
          dietType,
          recipe: recipeValue,
          ingredients: fields,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (resp.status === 200) {
        window.alert("Submitted successfully");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        // toast.error(error.response?.data?.message || "An error occurred");
      } else {
        // toast.error("An unexpected error occurred");
      }
      window.alert("An unexpected error occurred");
    }
  }
  function onIngedientChange(value: string[]) {
    setErrors({ ...errors, fields: "" });
    setFields(value);
  }
  return (
    <form className="w-[90%] p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label htmlFor="name" className="block font-semibold mb-1">
          Name
        </label>
        <input
          value={name}
          onChange={(e) => onNameChange(e)}
          type="text"
          name="name"
          id="name"
          className={`w-full p-2 border border-gray-400 rounded bg-white text-black ${
            errors.name && "border-red-500"
          }`}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block font-semibold mb-1">
          Description
        </label>
        <input
          value={description}
          onChange={(e) => onDescriptionChange(e)}
          type="text"
          name="description"
          id="description"
          className={`w-full p-2 border border-gray-400 rounded bg-white text-black ${
            errors.description && "border-red-500"
          }`}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="ingredients" className="block font-semibold mb-1">
          Ingredients
        </label>
        <DynamicField onChange={onIngedientChange} value={fields} />
        {errors.fields && <p className="text-red-500">{errors.fields}</p>}
      </div>
      <div>
        <label htmlFor="recipe" className="block font-semibold mb-1">
          Instructions
        </label>
        <div className="editor-custom">
          <EditorProvider>
            <Editor
              containerProps={{
                style: {
                  backgroundColor: "white",
                  listStyleType: "disc",
                },
              }}
              value={recipeValue}
              onChange={onRecipeValueChange}
              className="border border-gray-400 rounded mt-4"
            >
              <Toolbar className="flex space-x-2 bg-[#fdd901] p-2 rounded">
                <BtnUndo />
                <BtnRedo />
                <BtnBold />
                <BtnItalic />
                <div className="rsw-separator" />
                <BtnUnderline />
                <BtnNumberedList />
                <BtnBulletList />
              </Toolbar>
            </Editor>
          </EditorProvider>
        </div>
        {errors.recipeValue && (
          <p className="text-red-500">{errors.recipeValue}</p>
        )}
      </div>
      <div>
        <label htmlFor="image" className="block font-semibold mb-1">
          Image
        </label>
        <input
          //   value={image}
          onChange={(e) => onImageChange(e.target.files)}
          type="file"
          name="image"
          id="image"
          className={`w-full p-2 border border-gray-400 rounded bg-white text-black ${
            errors.image && "border-red-500"
          }`}
        />
        {errors.image && <p className="text-red-500">{errors.image}</p>}
      </div>
      <div>
        <label htmlFor="video" className="block font-semibold mb-1">
          Video
        </label>
        <input
          //   value={video?video.}
          onChange={(e) => onVideoChange(e.target.files)}
          type="file"
          name="video"
          id="video"
          className={`w-full p-2 border border-gray-400 rounded bg-white text-black ${
            errors.video && "border-red-500"
          }`}
        />
        {errors.video && <p className="text-red-500">{errors.video}</p>}
      </div>
      <div>
        <label htmlFor="servings" className="block font-semibold mb-1">
          Servings
        </label>
        <input
          value={servings || 0}
          onChange={(e) => onServingsChange(e)}
          type="number"
          name="servings"
          id="servings"
          className="w-full p-2 border border-gray-400 rounded bg-white text-black"
        />
      </div>
      <div>
        <label htmlFor="cookTime" className="block font-semibold mb-1">
          Cook Time
        </label>
        <input
          value={cookTime || 0}
          onChange={(e) => onCookTimeChange(e)}
          type="number"
          name="cookTime"
          id="cookTime"
          className="w-full p-2 border border-gray-400 rounded bg-white text-black"
        />
      </div>
      <div>
        <label htmlFor="difficulty" className="block font-semibold mb-1">
          Difficulty
        </label>
        <select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e)}
          name="difficulty"
          id="difficulty"
          className="w-full p-2 border border-gray-400 rounded bg-white text-black"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div>
        <label htmlFor="dietType" className="block font-semibold mb-1">
          Diet Type
        </label>
        <select
          value={dietType}
          onChange={(e) => onDietTypeChange(e)}
          name="dietType"
          id="dietType"
          className="w-full p-2 border border-gray-400 rounded bg-white text-black"
        >
          <option value="vegetarian">Vegetarian</option>
          <option value="non-vegetarian">Non-Vegetarian</option>
        </select>
      </div>
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className={`w-full p-3 mt-4 bg-black text-white font-bold rounded hover:bg-slate-800 transition ${
          loading ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {loading ? <Loader /> : "Submit"}
      </button>
      {/* <ToastContainer /> */}
    </form>
  );
};

// export const RecipeForm =         (RecipeFormComponent);
export const RecipeForm = RecipeFormComponent;

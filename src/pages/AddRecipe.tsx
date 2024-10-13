import { useEffect, useState } from "react";
import { RecipeForm } from "../components/RecipeForm";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { ListCardProps } from "../components/ListCard";
import { toast, ToastContainer } from "react-toastify";

const AddRecipePageComponent = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [recipe, setRecipe] = useState<ListCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) {
      const fetchRecipeById = async () => {
        // fetch recipe by id
        setLoading(true);
        try {
          const resp = await axios.get(
            `https://pinata-backend.onrender.com/recipe/get-recipe/${id}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          const { recipe } = resp.data;
          setRecipe(recipe);
          setLoading(false);
        } catch (err: unknown) {
          setLoading(false);
          toast.error("Error fetching recipe");
        }
      };

      fetchRecipeById();
    }
  }, [id, token]);
  if (loading && id) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        {id ? "Edit Your Recipe" : "Share Your Recipe"}
      </h1>
      <RecipeForm data={recipe} />
      <ToastContainer />
    </div>
  );
};

// export const AddRecipePage =         (AddRecipePageComponent);
export const AddRecipePage = AddRecipePageComponent;

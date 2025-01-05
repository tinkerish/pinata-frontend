import { useEffect, useState } from "react";
import { RecipeById } from "../components/RecipeById";
import { useParams } from "react-router-dom";
import { ListCardProps } from "../components/ListCard";
import { useAuth } from "../hooks/useAuth";
// import { toast } from "react-toastify";
import axios from "axios";

const RecipeComponent = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [recipe, setRecipe] = useState<ListCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  const rateRecipe = async (
    recipeId: string,
    rating: number,
    userId: string
  ) => {
    try {
      const resp = await axios.post(
        `https://pinata-backend.onrender.com/recipe/rate-recipe`,
        {
          rating,
          recipeId,
          userId,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (resp.status !== 200) {
        throw new Error("Error rating recipe");
      }
      window.location.reload();
    } catch (err: unknown) {
      // toast.error("Error rating recipe");
    }
  };
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
  return (
    <div>
      {loading ? (
        <div className="min-h-[100vh] text-center">Loading...</div>
      ) : recipe ? (
        <RecipeById data={recipe} rateRecipe={rateRecipe} />
      ) : (
        <div className="min-h-[100vh] text-center">Recipe not found</div>
      )}
    </div>
  );
};

export const Recipe = RecipeComponent;

import { GeneralList } from "../components/GeneralList";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ListCardProps } from "../components/ListCard";
import { ListLoader } from "../components/ListLoader";
const MyRecipePageComponent = () => {
  //logic to get recipes by user
  const [mockGeneralRecipe, setMockGeneralRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();
  const editHandler = (id: string) => {
    navigate(`/home/add-recipe/${id}`);
  };
  const viewDetailsHandler = (id: string) => {
    navigate(`/home/recipe/${id}`);
  };
  const deleteHandler = async (id: string) => {
    try {
      const resp = await axios.post(
        `https://pinata-backend.onrender.com/recipe/delete-recipe/${id}`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (resp.status !== 200) {
        throw new Error("Error deleting recipe");
      }
      setMockGeneralRecipe((prev) =>
        prev.filter((recipe: ListCardProps) => recipe._id !== id)
      );
    } catch (err: unknown) {
      toast.error("Error deleting recipe");
    }
  };
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(
          `https://pinata-backend.onrender.com/recipe/get-recipe-by-user`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if (resp.status !== 200) {
          setError("Error fetching data");
          return;
        }
        setMockGeneralRecipe(resp.data.recipes);
        setLoading(false);
      } catch (err: unknown) {
        setLoading(false);
        setError("Error fetching data");
      }
    };
    fetchRecipes();
  }, [token]);

  return loading ? (
    <ListLoader />
  ) : error ? (
    <div className="text-[#ff0000] font-bold  min-h-[100vh]">{error}</div>
  ) : mockGeneralRecipe.length > 0 ? (
    <GeneralList
      data={mockGeneralRecipe}
      isEditOrDeleteAllowed={true}
      editHandler={editHandler}
      deleteHandler={deleteHandler}
      viewDetailsHandler={viewDetailsHandler}
    />
  ) : (
    <div className="text-xl font-bold  min-h-[100vh] text-center">
      No recipes found
    </div>
  );
};
// export const MyRecipePage =         (MyRecipePageComponent);
export const MyRecipePage = MyRecipePageComponent;

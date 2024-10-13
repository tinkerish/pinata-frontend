import { useEffect, useState } from "react";
import { HeroSection } from "../components/HeroSection";
import { GeneralList } from "../components/GeneralList";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ListLoader } from "../components/ListLoader";
const HomePageComponent = () => {
  const [mockGeneralRecipe, setMockGeneralRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth();

  const viewDetailsHandler = (id: string) => {
    navigate(`/home/recipe/${id}`);
  };
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(
          `https://pinata-backend.onrender.com/recipe/get-recipes`,
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
  if (error) return <div>{error}</div>;

  return (
    <div>
      <HeroSection />
      {loading ? (
        <ListLoader />
      ) : error ? (
        <div className="text-[#ff0000] font-bold  h-[300px]">{error}</div>
      ) : mockGeneralRecipe.length > 0 ? (
        <GeneralList
          data={mockGeneralRecipe}
          isEditOrDeleteAllowed={false}
          viewDetailsHandler={viewDetailsHandler}
        />
      ) : (
        <div className="text-xl font-bold  h-[300px]">No recipes found</div>
      )}
    </div>
  );
};

// export const HomePage =         (HomePageComponent);
export const HomePage = HomePageComponent;

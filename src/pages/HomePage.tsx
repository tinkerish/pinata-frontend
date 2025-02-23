// import { useEffect, useState } from "react";
// import { HeroSection } from "../components/HeroSection";
// import { GeneralList } from "../components/GeneralList";
// import { useAuth } from "../hooks/useAuth";
// import axios from "axios";
// import { ListLoader } from "../components/ListLoader";

import Feature from "../components/Landing/Feature";
import Feedbacks from "../components/Landing/Feedbacks";
import FoodDesign from "../components/Landing/FoodDesign";
import HeroIntro from "../components/Landing/HeroIntro";
import PopularRecipes from "../components/Landing/PopularRecipes";

const HomePageComponent = () => {
  // const [mockGeneralRecipe, setMockGeneralRecipe] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");
  // const navigate = useNavigate();
  // const { token } = useAuth();

  // const viewDetailsHandler = (id: string) => {
  //   navigate(`/home/recipe/${id}`);
  // };
  // useEffect(() => {
  //   const fetchRecipes = async () => {
  //     try {
  //       setLoading(true);
  //       const resp = await axios.get(
  //         `https://pinata-backend.onrender.com/recipe/get-recipes`,
  //         {
  //           headers: {
  //             Authorization: `${token}`,
  //           },
  //         }
  //       );
  //       if (resp.status !== 200) {
  //         setError("Error fetching data");
  //         return;
  //       }
  //       setMockGeneralRecipe(resp.data.recipes);
  //       setLoading(false);
  //     } catch (err: unknown) {
  //       setLoading(false);
  //       setError("Error fetching data");
  //     }
  //   };
  //   fetchRecipes();
  // }, [token]);
  // if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col">
      <HeroIntro />
      <PopularRecipes />
      <Feature />
      <Feedbacks />
      <FoodDesign />
    </div>
  );
};

export const HomePage = HomePageComponent;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { ListCardProps } from "../components/ListCard";
import { toast, ToastContainer } from "react-toastify";
import { Tabs } from "../components/Tabs";
const tabs = [
  { title: "Edit", component: "./MultiStepForm/index.tsx" },
  { title: "Preview", component: "./Preview.tsx" },
];
const AddRecipePageComponent = () => {
  // const { id } = useParams();
  // const { token } = useAuth();
  // const [recipe, setRecipe] = useState<ListCardProps | null>(null);
  // const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const tabChangeHandler = (index: number) => {
    setTab(index);
  };
  // useEffect(() => {
  //   if (id) {
  //     const fetchRecipeById = async () => {
  //       // fetch recipe by id
  //       setLoading(true);
  //       try {
  //         const resp = await axios.get(
  //           `https://pinata-backend.onrender.com/recipe/get-recipe/${id}`,
  //           {
  //             headers: {
  //               Authorization: `${token}`,
  //             },
  //           }
  //         );
  //         const { recipe } = resp.data;
  //         setRecipe(recipe);
  //         setLoading(false);
  //       } catch (err: unknown) {
  //         setLoading(false);
  //         toast.error("Error fetching recipe");
  //       }
  //     };

  //     fetchRecipeById();
  //   }
  // }, [id, token]);
  // if (loading && id) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center min-h-[100vh]">
      <Tabs value={tab} onChange={tabChangeHandler} tabs={tabs}></Tabs>
      <ToastContainer />
    </div>
  );
};

export const AddRecipePage = AddRecipePageComponent;

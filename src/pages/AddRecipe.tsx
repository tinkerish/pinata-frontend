import { lazy, useCallback, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import axios from "axios";
// import { ListCardProps } from "../components/ListCard";
// import { toast, ToastContainer } from "react-toastify";
import { Tabs } from "../components/Tabs";
import { FormValidation, RecipeForm } from "../types/form.tsx";
import { TabComponent } from "../types/common.tsx";
import { checkErrors } from "../utils/multiStepValidation.ts";
import Loading from "../components/loading.tsx";

const EditComponent = lazy(
  () => import("../components/MultiStepForm/index.tsx")
);
const PreviewComponent = lazy(() => import("../components/Preview.tsx"));

// const tabs = [
//   { title: "Edit", component: EditComponent },
//   { title: "Preview", component: PreviewComponent },
// ];
const AddRecipePageComponent = () => {
  // const { id } = useParams();
  // const { token } = useAuth();
  // const [recipe, setRecipe] = useState<ListCardProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState<RecipeForm>({
    title: "",
    description: "",
    cuisineType: "",
    estimatedCookingTime: {
      value: 0,
      qualifier: "minutes",
    },
    servingSize: 0,
    difficulty: "easy",
    coverImage: "",
    ingredients: [
      {
        name: "",
        quantity: 0,
        measurementUnit: "grams",
        notes: "",
      },
    ],
    instructions: [
      {
        instruction: "",
        image: "",
        video: "",
        tips: "",
      },
    ],
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({
    title: "",
    description: "",
    cuisineType: "",
    estimatedCookingTime: "",
    servingSize: "",
    difficulty: "",
    coverImage: "",
    ingredients: "",
    instructions: "",
  });
  const submitHandler = () => {
    try {
      setLoading(true);
      setTimeout(() => {
        console.log("Form Data", formData);
      }, 1000);
    } catch (error) {
      setError("Error submitting form" + error);
    } finally {
      setLoading(false);
    }
  };
  const manageValidations = (step: number) => {
    const { errors, isErrors }: FormValidation = checkErrors(formData, step);

    if (!isErrors && step === 2) {
      submitHandler();
      return true;
    }
    if (!isErrors) {
      setFormErrors(errors);
      return true;
    }
    setFormErrors(errors);
    return false;
  };
  const tabChangeHandler = (index: number) => {
    setTab(index);
  };
  const tabs: TabComponent[] = [
    {
      title: "Edit",
      component: EditComponent,
      props: {
        id: "tabpanel",
        ariaLabelledBy: "tab",
        formData,
        onChange: setFormData,
        formErrors,
        manageValidations,
      },
    },
    {
      title: "Preview",
      component: PreviewComponent,
      props: { id: "tabpanel", ariaLabelledBy: "tab", formData },
    },
  ];
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
  if (loading) return <Loading />;
  return (
    <div className="flex flex-col items-center">
      <Tabs value={tab} onChange={tabChangeHandler} tabs={tabs}></Tabs>
    </div>
  );
};

export const AddRecipePage = AddRecipePageComponent;

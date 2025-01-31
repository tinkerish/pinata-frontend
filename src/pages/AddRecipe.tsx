import { lazy, useCallback, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import axios from "axios";
// import { ListCardProps } from "../components/ListCard";
// import { toast, ToastContainer } from "react-toastify";
import { Tabs } from "../components/Tabs";
import { TabComponent } from "../types/common.tsx";
import Loading from "../components/loading.tsx";
import useFormStore from "../store/formStore.tsx";
import useClearFormData from "../hooks/useClearFormData.ts";

const EditComponent = lazy(
  () => import("../components/MultiStepForm/index.tsx")
);
const PreviewComponent = lazy(
  () => import("../components/Preview/index.tsx")
);

const AddRecipePageComponent = () => {
  // const { id } = useParams();
  // const { token } = useAuth();
  // const [recipe, setRecipe] = useState<ListCardProps | null>(null);
  const formData = useFormStore((state) => state.formData);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const [tab, setTab] = useState(0);
  const clearFormData = useClearFormData();
  // const currentPath = location.pathname;
  // console.log("Current Path", currentPath);

  // useEffect(() => {
  //   clearFormData();
  // }, []);
  const submitHandler = useCallback(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        console.log("Form Data", formData);
      }, 1000);
      clearFormData();
    } catch (error) {
      console.log("Error submitting form", error);
    } finally {
      setLoading(false);
    }
  }, [formData, clearFormData]);
  const tabChangeHandler = (index: number) => {
    setTab(index);
  };
  const tabs: TabComponent[] = useMemo(() => {
    return [
      {
        title: "Edit",
        component: EditComponent,
        props: {
          id: "tabpanel",
          ariaLabelledBy: "tab",
          submitHandler: submitHandler,
        },
      },
      {
        title: "Preview",
        component: PreviewComponent,
        props: { id: "tabpanel", ariaLabelledBy: "tab" },
      },
    ];
  }, [submitHandler]);
  // useEffect(() => {
  // console.log(error);
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

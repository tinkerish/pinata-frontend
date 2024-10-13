import { createRoot } from "react-dom/client";
import "./index.css";
import { ProtectedPage } from "./pages/ProtectedPage.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage.tsx";
import { MyRecipePage } from "./pages/MyRecipe.tsx";
import { AddRecipePage } from "./pages/AddRecipe.tsx";
import { Recipe } from "./pages/Recipe.tsx";
import { Login } from "./pages/Login.tsx";
import { Signup } from "./pages/Signup.tsx";
import { AuthProvider } from "./context/index.tsx";
// import { AuthProvider } from "./context/index.tsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/home" element={<ProtectedPage />}>
        <Route index element={<HomePage />} />
        <Route path="my-recipe" element={<MyRecipePage />} />
        <Route path="add-recipe/:id" element={<AddRecipePage />} />
        <Route path="add-recipe" element={<AddRecipePage />} />
        <Route path="recipe/:id" element={<Recipe />} />
      </Route>
      <Route path="*" element={<div>404</div>} />
      {/* <Route path="/" element={<Login />}>  */}
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      {/* </Route> */}
    </>
  )
);
createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

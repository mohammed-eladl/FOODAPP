import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MasterLayout from "./modules/SharedModule/components/MasterLayout/MasterLayout";
import NotFound from "./modules/SharedModule/components/NotFound/NotFound";
import AuthLayout from "./modules/SharedModule/components/AuthLayout/AuthLayout";
import Dashboard from "./modules/HomeModule/components/Dashboard/Dashboard";
import RecipesList from "./modules/RecipesModule/components/RecipesList/RecipesList";
import CategoriesList from "./modules/CategoriesListModule/components/CategoriesList/CategoriesList";
import UsersList from "./modules/UsersModule/components/UsersList/UsersList";
import Login from "./modules/AuthenticationModule/components/login/Login";
import Resetpass from "./modules/AuthenticationModule/components/resetpass/ResetPass";
import Register from "./modules/AuthenticationModule/components/register/Register";
import Forgotpass from "./modules/AuthenticationModule/components/forgotpass/ForgotPass";
import ProtectedRoute from "./modules/SharedModule/components/ProtectedRoute/ProtectedRoute";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  const [loginData, setLoginData] = useState(null);
  const saveLoginData = () => {
    let endcodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(endcodedToken);
    setLoginData(decodedToken);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);
  let router = createBrowserRouter([
    {
      path: "/dashboard",

      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterLayout loginData={loginData} />
        </ProtectedRoute>
      ),

      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "home",
          element: <Dashboard />,
        },
        {
          path: "recipes",
          element: <RecipesList />,
        },
        {
          path: "categories",
          element: <CategoriesList />,
        },
        {
          path: "users",
          element: <UsersList />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login saveLoginData={saveLoginData} />,
        },
        {
          path: "login",
          element: <Login saveLoginData={saveLoginData} />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forgotPass",
          element: <Forgotpass />,
        },
        {
          path: "resetpass",
          element: <Resetpass />,
        },
        {},
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

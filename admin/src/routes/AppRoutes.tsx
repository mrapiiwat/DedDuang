import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Zodiac from "../pages/Zodiac";
import CursedYear from "../pages/CursedYear";
import Tarot from "../pages/Tarot";
import Seemsee from "../pages/Seemsee";
import Login from "../pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "zodiac", element: <Zodiac /> },
      { path: "curse", element: <CursedYear /> },
      { path: "tarot", element: <Tarot /> },
      { path: "seemsee", element: <Seemsee /> },
    ],
  },
]);

const AppRoutes: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;

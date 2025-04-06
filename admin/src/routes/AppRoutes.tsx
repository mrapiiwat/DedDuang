import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../pages/Layout";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Dashboard /> }],
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

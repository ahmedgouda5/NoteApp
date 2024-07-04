import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./register/Register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./login/Login";
import Layout from "./layout/layout";
import Home from "./page/Home";
import { Toaster } from "react-hot-toast";
import ContextProvider from "./page/contenxt/Context";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/register", element: <Register /> },
        { path: "/", element: <Home /> },
        { path: "/Home", element: <Home /> },
        { path: "/login", element: <Login /> },
      ],
    },
  ]);
  return (
    <>
      <ContextProvider>
        <RouterProvider router={routes}>
          <Toaster position="top-center" />
        </RouterProvider>
      </ContextProvider>
    </>
  );
}

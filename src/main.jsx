import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./views/Home.jsx";
import Navigate from "./views/Navigate.jsx";
import QrScaner from "./views/QrScaner.jsx";
import Department from "./views/Department.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/navigate",
    element: <Navigate />,
  },
  { path: "/qrscaner", element: <QrScaner /> },
  { path: "/department", element: <Department /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

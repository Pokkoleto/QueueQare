import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./views/Home.jsx";
import Navigate from "./views/Navigate.jsx";
import QrScaner from "./views/QrScaner.jsx";
import Department from "./views/Department.jsx";
import Doctor from "./views/Doctor.jsx";
import Login from "./views/Login.jsx";
import HospitalManagement from "./views/HospitalManagement.jsx";
import AddQueue from "./views/AddQueue.jsx";

const router = createBrowserRouter([
  {
    path: "/:token",
    element: <Home />,
  },
  {
    path: "/navigate",
    element: <Navigate />,
  },
  { path: "/qrscaner", element: <QrScaner /> },
  { path: "/department", element: <Department /> },
  { path: "/login", element: <Login /> },
  { path: "/doctor", element: <Doctor /> },
  { path: "/hospital-manage", element: <HospitalManagement /> },
  { path: "/queue", element: <AddQueue /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

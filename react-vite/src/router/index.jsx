import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "../components/LandingPage";
import SignUpFormPage from "../components/SignUpFormPage";
import LoginFormPage from "../components/LoginFormPage";

export const router = createBrowserRouter([
  {
    element: <LandingPage />,
    path: "/",
  },
  {
    element: <SignUpFormPage />,
    path: "/sign-up",
  },
  {
    element: <LoginFormPage />,
    path: "/log-in",
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <h1>Home Page</h1>,
      },
    ],
  },
]);

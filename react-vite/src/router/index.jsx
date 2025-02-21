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
        path: "/applications",
        element: <h1>Applications</h1>,
      },
      {
        path: "/common-questions",
        element: <h1>Common Questions</h1>,
      },
      {
        path: "/resumes",
        element: <h1>Resumes</h1>,
      },
      {
        path: "/cover-letters",
        element: <h1>Cover Letters</h1>,
      },
    ],
  },
]);

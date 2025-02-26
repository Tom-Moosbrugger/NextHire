import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "../components/LandingPage";
import SignUpFormPage from "../components/SignUpFormPage";
import LoginFormPage from "../components/LoginFormPage";
import ApplicationTracker from "../components/ApplicationTracker";
import ApplicationDetails from "../components/ApplicationDetails";
import ProtectedRoute from "./ProtectedRoute";

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
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/applications/:applicationId",
            element: <ApplicationDetails />,
          },
          {
            path: "/applications",
            element: <ApplicationTracker />,
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
    ]
  }
]);

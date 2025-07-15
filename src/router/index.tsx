import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import RegisterWizard from "../pages/RegisterWizard";
import Faq from "../pages/Faq";
import Privacy from "../pages/Privacy";
import Contact from "../pages/Contact";
import Matches from "../pages/Matches";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/pricing" },
  { path: "/my-plan" },
  { path: "/register", element: <RegisterWizard /> },
  { path: "/faq", element: <Faq /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/contact", element: <Contact /> },
  { path: "/matches", element: <Matches /> }
]);

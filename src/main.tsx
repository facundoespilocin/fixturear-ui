import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./hooks/useAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Register from "./pages/RegisterWizard";
import Matches from "./pages/Matches";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Privacy from "./pages/Privacy";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout() {
  return (
    <AuthProvider>
      <div className="p-7">
        <Navbar />
        <div className="container mx-auto mt-6 p-2">
          <Outlet />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }, 
      { path: "matches", element: <Matches /> }, 
      { path: "faq", element: <Faq /> }, 
      { path: "contact", element: <Contact /> }, 
      { path: "privacy", element: <Privacy /> }, 
      {
        element: <ProtectedRoute />, 
        children: [
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
]);

export default function Main() {
  return <RouterProvider router={router} />;
}

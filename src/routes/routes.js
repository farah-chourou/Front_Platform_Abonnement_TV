import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "../layouts/dashboard";
import SimpleLayout from "../layouts/simple";
//
import LoginPage from "../pages/Auth/LoginPage";
import ForgetPasswordPage from "../pages/Auth/ForgetPasswordPage";
import Page404 from "../pages/ErorPages/Page404";
import GestionDeveloppeur from "../pages/GestionDeveloppeur/GestionClient";
import GestionAbonnements from "../pages/GestionAbonnements/index";
import Parametre from "../pages/Parametres/index";
import DetailsClient from "../pages/GestionDeveloppeur/DetailsClient";
import DetailsAbonnement from "../pages/GestionAbonnements/DetailsAbonnement";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    { element: <Navigate to="/login" />, index: true },

    {
      path: "/app",
      element: <DashboardLayout />,
      children: [
        { path: "gestion_clients", element: <GestionDeveloppeur /> },
        { path: "gestion_clients/details/:id", element: <DetailsClient /> },
        { path: "gestion_abonnements", element: <GestionAbonnements /> },
        {
          path: "gestion_abonnements/details/:id",
          element: <DetailsAbonnement />,
        },
        {
          path: "parametre",
          element: <Parametre />,
        },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "login/oublierMdp",
      element: <ForgetPasswordPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

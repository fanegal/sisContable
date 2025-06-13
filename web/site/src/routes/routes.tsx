import { Layout, PrivateRoute, PublicRoute } from "common-lib";
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

const Home = lazy(() => import("../views/home/Home"));
const Dashboard = lazy(() => import("../views/dashboard/Dashboard"));
const Reports = lazy(() => import("../views/reports/Reports"));
const Login = lazy(() => import("@/views/login/Login"));

export const appRoutes = [
  // Ruta por defecto que redirige a login
  { path: "/", element: <Navigate to="/login" /> },

  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <Login /> }
    ]
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout flatMenu={[]}/>,
        children: [
          {
            path: "/home/*",
            element: <Home />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/reports",
            element: <Reports />,
          },
        ],
      },
    ],
  },
  // Fallback para rutas no existentes
  { path: "*", element: <Navigate to="/login" /> },
];

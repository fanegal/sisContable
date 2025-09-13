import Gastos from "@/views/gastos/Gastos";
import Ingresos from "@/views/ingresos/Ingresos";
import Obras from "@/views/obras/Obras";
import { Layout, PrivateRoute, PublicRoute } from "common-lib";
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

const Home = lazy(() => import("../views/home/Home"));
const Dashboard = lazy(() => import("../views/dashboard/Dashboard"));
const Reports = lazy(() => import("../views/reports/Reports"));
const Login = lazy(() => import("@/views/login/Login"));

/**
 * 
 * id: number
    name: string
    icon: string
    id_parent: number | null
    children?: MenuItemData[]
 */
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
        element: <Layout flatMenu={[{
          id: 1,
          name: "Obras",
          icon: "apartment",
          id_parent: null,
          url: "obras"
        },{
          id: 1,
          name: "Ingresos",
          icon: "savings",
          id_parent: null,
          url: "ingresos"
        },{
          id: 1,
          name: "Gastos",
          icon: "payments",
          id_parent: null,
          url: "gastos"
        }]} />,
        children: [
          {
            path: "/home/*",
            element: <Home />,
          },
          {
            path: "/obras/*",
            element: <Obras />,
          },
          {
            path: "/gastos/*",
            element: <Gastos />,
          },
          {
            path: "/ingresos/*",
            element: <Ingresos />,
          },
        ],
      },
    ],
  },
  // Fallback para rutas no existentes
  { path: "*", element: <Navigate to="/login" /> },
];

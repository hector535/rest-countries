import React from "react";
import { Navigate } from "react-router-dom";
import { CountriesLayout } from "@/features/countries";

const Countries = React.lazy(() => import("@/pages/countries/countries"));
const Country = React.lazy(() => import("@/pages/country/country"));

export const appRoutes = [
  {
    element: <CountriesLayout />,
    children: [
      {
        path: "/countries",
        element: <Countries />,
      },
      {
        path: "/countries/:code",
        element: <Country />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/countries" />,
  },
];

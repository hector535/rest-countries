import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, Navigate, createHashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Root } from "./routes/root";

import "../sass/style.scss";

const Countries = React.lazy(() => import("./routes/countries/countries"));
const Country = React.lazy(() => import("./routes/country/country"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 3 * 60 * 1000,
    },
  },
});

const router = createHashRouter([
  {
    element: <Root />,
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

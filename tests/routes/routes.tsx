import React from "react";
import Countries from "../../src/routes/countries/countries";
import Country from "../../src/routes/country/country";

export const routes = [
  {
    path: "/countries",
    element: <Countries />,
  },
  {
    path: "/countries/:name",
    element: <Country />,
  },
];

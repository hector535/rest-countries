import { useQuery } from "react-query";
import {
  getAllCountries,
  getCountriesByRegion,
  getCountryByCode,
} from "./countries";
import { Country } from "@/types";

export const useGetCountries = (region: string = "") => {
  const { data, ...rest } = useQuery(["countries", region], () => {
    if (!region) return getAllCountries();

    return getCountriesByRegion(region);
  });
  return { countries: data ?? [], ...rest };
};

export const useGetCountryByCode = (code: string = "") => {
  const { data, ...rest } = useQuery(
    ["countries", code],
    () => getCountryByCode(code),
    { suspense: true }
  );

  return {
    country: data ?? ({} as Country),
    ...rest,
  };
};

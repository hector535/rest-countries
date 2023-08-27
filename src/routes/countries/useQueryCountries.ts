import { useQuery } from "react-query";
import { getAllCountries, getCountriesByRegion } from "../../api/countries";

export const useQueryCountries = (region: string = "") => {
  const { data, ...rest } = useQuery(["countries", region], () => {
    if (!region) return getAllCountries();

    return getCountriesByRegion(region);
  });
  return { countries: data ?? [], ...rest };
};

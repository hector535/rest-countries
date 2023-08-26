import { useQuery } from "react-query";
import { getAllCountries, getCountries } from "../../api/countries";

export const useQueryCountries = (region: string = "") => {
  const { data, ...rest } = useQuery(["countries", region], () => {
    if (!region) return getAllCountries();

    return getCountries(region);
  });
  return { countries: data ?? [], ...rest };
};

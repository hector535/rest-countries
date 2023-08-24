import { useQuery } from "react-query";
import { getCountries } from "../../api/countries";

export const useQueryCountries = (region: string = "") => {
  const { data, ...rest } = useQuery(["countries", region], () =>
    getCountries(region)
  );
  return { countries: data ?? [], ...rest };
};

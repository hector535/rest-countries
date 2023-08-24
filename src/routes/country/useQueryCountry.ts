import { useQuery } from "react-query";
import { countryQuery } from "./countryQuery";
import { Country } from "../../types/country";

export const useQueryCountry = (name: string = "") => {
  const { data, ...rest } = useQuery({ ...countryQuery(name), suspense: true });

  return { country: data ?? ({} as Country), ...rest };
};

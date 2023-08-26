import { useQuery } from "react-query";
import { countryQuery } from "./countryQuery";
import { Country } from "../../types/country";

export const useQueryCountry = (code: string = "") => {
  const { data, ...rest } = useQuery({ ...countryQuery(code), suspense: true });

  return { country: data ?? ({} as Country), ...rest };
};

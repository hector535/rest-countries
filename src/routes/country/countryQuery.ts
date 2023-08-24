import { getCountry } from "../../api/countries";

export const countryQuery = (name: string = "") => ({
  queryKey: ["countries", name],
  queryFn: () => getCountry(name),
});

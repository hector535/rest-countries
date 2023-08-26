import { getCountryByCode } from "../../api/countries";

export const countryQuery = (code: string = "") => ({
  queryKey: ["countries", code],
  queryFn: () => getCountryByCode(code),
});

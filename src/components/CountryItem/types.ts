import { Country } from "../../types/country";

export type CountryItemProps = {
  country: Country;
  onClick: (name: string) => void;
};

import { Country } from "../../types/country";

export type CountryItemProps = {
  country: Country;
  onSelect: (name: string) => void;
};

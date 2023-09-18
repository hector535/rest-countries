import { Country } from "@/types";

export type CountryItemProps = {
  country: Country;
  onSelect: (name: string) => void;
};

import { Country } from "../types/country";
import { ICountry } from "./types";

export const toCountry = (c: ICountry): Country => {
  return {
    name: c.name.common,
    officialName: c.name.official,
    population: c.population,
    region: c.region,
    subregion: c.subregion,
    capital: c.capital[0],
    tld: c.tld?.join(", "),
    currencies:
      c.currencies &&
      toCommaSeparatedList(c.currencies, (k) => c.currencies[k].name),
    languages:
      c.languages && toCommaSeparatedList(c.languages, (k) => c.languages[k]),
    borders: c.borders,
    flag: {
      imageURL: c.flags.svg,
      alt: c.flags.alt,
    },
  };
};

function toCommaSeparatedList<T extends { [key: string]: unknown }>(
  obj: T,
  cb: (key: string) => string
): string {
  return Object.keys(obj).map(cb).join(", ");
}

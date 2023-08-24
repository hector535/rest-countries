import { toCountry } from "./utils";
import { type ICountry } from "./types";
import { type Country } from "../types/country";

export const getCountries = async (region: string): Promise<Country[]> => {
  let url =
    "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags";

  if (region)
    url = `https://restcountries.com/v3.1/region/${region}?fields=name,population,region,capital,flags`;

  const response = await fetch(url);

  if (!response.ok) return [];

  const data = (await response.json()) as ICountry[];

  return data.map((c) => toCountry(c));
};

export const getCountry = async (name: string): Promise<Country> => {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,population,region,capital,flags,subregion,tld,currencies,languages,borders`;

  const response = await fetch(url);

  if (!response.ok) throw new Error(`No results have been found with: ${name}`);

  const countries = (await response.json()) as ICountry[];

  return countries.map((c) => toCountry(c))[0];
};

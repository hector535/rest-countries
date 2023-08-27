import { toCountry } from "./utils";
import { type ICountry } from "./types";
import { type Country } from "../types/country";

export const getAllCountries = async (): Promise<Country[]> => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca3"
  );

  const data = (await response.json()) as ICountry[];

  return data.map((c) => toCountry(c));
};

export const getCountriesByRegion = async (
  region: string
): Promise<Country[]> => {
  const response = await fetch(
    `https://restcountries.com/v3.1/region/${region}?fields=name,population,region,capital,flags,cca3`
  );

  const data = (await response.json()) as ICountry[];

  return data.map((c) => toCountry(c));
};

export const getCountryByCode = async (code: string): Promise<Country> => {
  const url = `https://restcountries.com/v3.1/alpha/${code}?fields=name,population,region,capital,flags,subregion,tld,currencies,languages,borders,cca3`;

  const response = await fetch(url);

  if (!response.ok) throw new Error(`No results have been found with: ${code}`);

  const country = (await response.json()) as ICountry;

  return toCountry(country);
};

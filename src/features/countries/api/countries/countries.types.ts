export interface ICountry {
  name: IName;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: ICurrencies;
  idd: IIdd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: ILanguages;
  translations: { [key: string]: ITranslation };
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: IDemonyms;
  flag: string;
  maps: IMaps;
  population: number;
  gini: IGini;
  fifa: string;
  car: ICar;
  timezones: string[];
  continents: string[];
  flags: IFlags;
  coatOfArms: ICoatOfArms;
  startOfWeek: string;
  capitalInfo: ICapitalInfo;
  postalCode: IPostalCode;
}

interface ICapitalInfo {
  latlng: number[];
}

interface ICar {
  signs: string[];
  side: string;
}

interface ICoatOfArms {
  png: string;
  svg: string;
}

interface ICurrencies {
  [key: string]: ICurrency;
}

interface ICurrency {
  name: string;
  symbol: string;
}

interface IDemonyms {
  eng: IEng;
  fra: IEng;
}

interface IEng {
  f: string;
  m: string;
}

interface IFlags {
  png: string;
  svg: string;
  alt: string;
}

interface IGini {
  "2019": number;
}

interface IIdd {
  root: string;
  suffixes: string[];
}

interface ILanguages {
  [key: string]: string;
}

interface IMaps {
  googleMaps: string;
  openStreetMaps: string;
}

interface IName {
  common: string;
  official: string;
  nativeName: INativeName;
}

interface INativeName {
  ukr: ITranslation;
}

interface ITranslation {
  official: string;
  common: string;
}

interface IPostalCode {
  format: string;
  regex: string;
}

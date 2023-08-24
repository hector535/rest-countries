export type Country = {
  name: string;
  officialName: string;
  population: number;
  region: string;
  subregion?: string;
  tld?: string;
  currencies?: string;
  languages?: string;
  borders?: string[];
  capital: string;
  flag: {
    imageURL: string;
    alt: string;
  };
};

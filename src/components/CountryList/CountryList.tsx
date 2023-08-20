import { Country } from "../../types/country";
import style from "./CountryList.module.scss";

type CountryListProps = {
  countries: Country[];
  renderCountry: (c: Country) => React.ReactNode;
};

export const CountryList = (props: CountryListProps) => {
  const { countries, renderCountry } = props;
  return (
    <div className={style.country_list}>{countries.map(renderCountry)}</div>
  );
};

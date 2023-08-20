import { Country } from "../../../types/country";
import style from "./CountryItem.module.scss";

type CountryItemProps = {
  country: Country;
  onClick: (name: string) => void;
};

export const CountryItem = (props: CountryItemProps) => {
  const { country, onClick } = props;
  const { name, capital, flag, population, region } = country;

  return (
    <div
      className={style.country_item}
      tabIndex={0}
      onClick={() => onClick(name)}
    >
      <img src={flag.imageURL} alt={flag.alt} />
      <h2>{name}</h2>

      <div>
        <p>
          <strong>Population:</strong>
          {population}
        </p>
        <p>
          <strong>Region:</strong>
          {region}
        </p>
        <p>
          <strong>Capital:</strong>
          {capital}
        </p>
      </div>
    </div>
  );
};

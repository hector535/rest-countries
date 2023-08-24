import { CountryItemProps } from "./types";
import style from "./CountryItem.module.scss";

export const CountryItem = (props: CountryItemProps) => {
  const { country, onClick } = props;
  const { name, officialName, capital, flag, population, region } = country;

  return (
    <div
      className={style.country_item}
      tabIndex={0}
      onClick={() => onClick(officialName)}
    >
      <img
        className={style.flag}
        src={flag.imageURL}
        alt={flag.alt}
        height={160}
      />

      <div className={style.content}>
        <h2 className={style.title}>{name}</h2>
        <div className={style.details}>
          <p className={style.information}>
            <span>Population: </span>
            {new Intl.NumberFormat().format(population)}
          </p>
          <p className={style.information}>
            <span>Region: </span>
            {region}
          </p>
          <p className={style.information}>
            <span>Capital: </span>
            {capital}
          </p>
        </div>
      </div>
    </div>
  );
};

import { type CountryItemProps } from "./country-item.types";
import style from "./country-item.module.scss";

export const CountryItem = (props: CountryItemProps) => {
  const { country, onSelect } = props;
  const { name, cca3, capital, flag, population, region } = country;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter" || e.code === "Space") onSelect(cca3);
  };

  return (
    <div
      className={style.country_item}
      tabIndex={0}
      onClick={() => onSelect(cca3)}
      onKeyDown={handleKeyDown}
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

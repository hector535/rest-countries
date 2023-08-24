import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Tag } from "../../components/Tag/Tag";
import { Icon } from "../../components/Icon/Icon";
import { useQueryCountry } from "./useQueryCountry";
import style from "./country.module.scss";

const Country = () => {
  const { name } = useParams();
  const { country } = useQueryCountry(name);
  const navigate = useNavigate();

  return (
    <main className={style.page}>
      <Button
        onClick={() => navigate(-1)}
        icon={<Icon name="arrow-left" />}
        text="Back"
      />

      <div className={style.main_content}>
        <picture>
          <source
            media="(max-width: 1439px)"
            width={320}
            height={230}
            srcSet={country.flag.imageURL}
          />
          <source
            media="(min-width: 1440px)"
            width={560}
            height={400}
            srcSet={country.flag.imageURL}
          />
          <img
            src={country.flag.imageURL}
            alt={country.flag.alt}
            width={320}
            height={230}
          />
        </picture>

        <div className={style.text_content}>
          <h2>{country.name}</h2>

          <div className={style.primary_text}>
            <div>
              <p>
                <strong>Native Name:</strong> {country.name}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {new Intl.NumberFormat().format(country.population)}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Sub Region:</strong> {country.subregion}
              </p>
              <p>
                <strong>Capital:</strong> {country.capital}
              </p>
            </div>
            <div>
              <p>
                <strong>Top Level Domain:</strong> {country.tld}
              </p>
              <p>
                <strong>Currencies:</strong> {country.currencies}
              </p>
              <p>
                <strong>Languages:</strong> {country.languages}
              </p>
            </div>
          </div>

          {!!country.borders && country.borders.length > 0 && (
            <div className={style.secondary_text}>
              <h3>Border Countries:</h3>
              <div className={style.tags}>
                {country.borders?.map((b) => (
                  <Tag key={b}>{b}</Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Country;

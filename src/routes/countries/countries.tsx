import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { VirtuosoGrid } from "react-virtuoso";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { CountryItem } from "../../components/CountryItem/CountryItem";
import { LoadingView } from "../../components/LoadingView/LoadingView";
import { ErrorView } from "../../components/ErrorView/ErrorView";
import { useQueryCountries } from "./useQueryCountries";
import { countryQuery } from "../country/countryQuery";
import { regions } from "../../data/regions";
import style from "./countries.module.scss";

const Countries = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const countryParam = searchParams.get("country");
  const regionParam = searchParams.get("region");

  const [country, setCountry] = useState<string>(countryParam ?? "");
  const [region, setRegion] = useState<string>(regionParam ?? "");

  const { countries, isLoading, isSuccess, isError, error, refetch } =
    useQueryCountries(region?.toLowerCase());

  const filteredCountries = useMemo(
    () => countries.filter((c) => c.name.toLowerCase().includes(country)),
    [countries, country]
  );

  const handleCountryClick = async (officialName: string) => {
    queryClient.prefetchQuery(countryQuery(officialName));
    navigate(`/countries/${officialName}`);
  };

  useEffect(() => {
    navigate(`?region=${region}&country=${country}`);
  }, [country, region]);

  return (
    <main className={style.page}>
      <div className={style.filters}>
        <SearchInput
          className={style.search}
          autoFocus
          name="q"
          placeholder="Search for a country..."
          onChange={(e) => setCountry(e.target.value)}
          value={country}
        />

        <Dropdown
          className={style.dropdown}
          options={regions}
          onSelectOption={setRegion}
          selectedValue={region}
        />
      </div>

      {isLoading && <LoadingView text="Loading..." />}

      {isError && <ErrorView error={error} resetErrorBoundary={refetch} />}

      {isSuccess && (
        <VirtuosoGrid
          listClassName={style.virtuoso_grid}
          totalCount={filteredCountries.length}
          overscan={50}
          itemContent={(index) => (
            <CountryItem
              key={filteredCountries[index].name}
              country={filteredCountries[index]}
              onClick={handleCountryClick}
            />
          )}
        ></VirtuosoGrid>
      )}
    </main>
  );
};

export default Countries;

import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { VirtuosoGrid } from "react-virtuoso";
import Select, { SelectInstance } from "react-select";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { CountryItem } from "../../components/CountryItem/CountryItem";
import { LoadingView } from "../../components/LoadingView/LoadingView";
import { ErrorView } from "../../components/ErrorView/ErrorView";
import { NoResultsMessage } from "../../components/NoResultsMessage/NoResultsMessage";
import { useQueryCountries } from "./useQueryCountries";
import { countryQuery } from "../country/countryQuery";
import { regions } from "../../data/regions";
import { Option } from "../../types/select";
import { selectStyles } from "./selectStyles";
import { initSelect } from "./utils";
import style from "./countries.module.scss";

const Countries = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const countryParam = searchParams.get("country");
  const regionParam = searchParams.get("region");

  const [country, setCountry] = useState(countryParam ?? "");
  const [region, setRegion] = useState(initSelect(regions, regionParam ?? ""));

  const { countries, isLoading, isSuccess, isError, error, refetch } =
    useQueryCountries(region.value.toLowerCase());

  const selectRef = useRef<SelectInstance<Option>>(null);

  const filteredCountries = useMemo(
    () =>
      countries.filter((c) =>
        c.name.toLowerCase().includes(country.toLowerCase())
      ),
    [countries, country]
  );

  const handleSelectCountry = async (code: string) => {
    queryClient.prefetchQuery(countryQuery(code));
    navigate(`/countries/${code}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "Enter":
        selectRef.current!.onMenuOpen();
        break;
    }
  };

  useEffect(() => {
    setSearchParams({ region: region.label, country });
  }, [country, region, setSearchParams]);

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

        <Select
          ref={selectRef}
          name="region"
          placeholder="Filter by Region"
          styles={selectStyles}
          options={regions}
          value={region.value ? region : undefined}
          isSearchable={false}
          onKeyDown={handleKeyDown}
          onChange={(opt) => setRegion(opt!)}
        />
      </div>

      {isLoading && <LoadingView text="Loading..." />}

      {isError && <ErrorView error={error} resetErrorBoundary={refetch} />}

      {isSuccess && !filteredCountries.length && <NoResultsMessage />}

      {isSuccess && !!filteredCountries.length && (
        <VirtuosoGrid
          tabIndex={1}
          listClassName={style.virtuoso_grid}
          totalCount={filteredCountries.length}
          overscan={50}
          itemContent={(index) => (
            <CountryItem
              key={filteredCountries[index].name}
              country={filteredCountries[index]}
              onSelect={handleSelectCountry}
            />
          )}
        ></VirtuosoGrid>
      )}
    </main>
  );
};

export default Countries;

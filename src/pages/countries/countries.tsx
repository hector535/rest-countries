import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { VirtuosoGrid } from "react-virtuoso";
import { LoadingView, ErrorView, Select } from "@/components";
import {
  SearchInput,
  CountryItem,
  NoResultsMessage,
  useGetCountries,
  regions,
} from "@/features/countries";
import style from "./countries.module.scss";

const Countries = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const country = searchParams.get("country") || "";
  const region = searchParams.get("region") || "";

  const { countries, isLoading, isSuccess, isError, error, refetch } =
    useGetCountries(region.toLowerCase());

  const filteredCountries = useMemo(
    () =>
      countries.filter((c) =>
        c.name.toLowerCase().includes(country!.toLowerCase())
      ),
    [countries, country]
  );

  const handleInputChange = (property: string, value: string) => {
    const obj = { country, region, [property]: value };
    setSearchParams({ region: obj.region, country: obj.country });
  };

  return (
    <main className={style.page}>
      <div className={style.filters}>
        <SearchInput
          className={style.search}
          autoFocus
          name="country-name"
          placeholder="Search for a country..."
          autoComplete="off"
          onChange={(e) => handleInputChange("country", e.target.value)}
          value={country!}
        />

        <Select
          name="country-region"
          aria-label="country-region"
          placeholder="Filter by Region"
          options={regions}
          value={regions.find((r) => r.value === region)}
          onChange={(opt) => handleInputChange("region", opt!.value)}
        />
      </div>

      {isLoading && <LoadingView text="Loading..." />}

      {isError && <ErrorView error={error} resetErrorBoundary={refetch} />}

      {isSuccess && !filteredCountries.length && <NoResultsMessage />}

      {isSuccess && !!filteredCountries.length && (
        <VirtuosoGrid
          data={filteredCountries}
          listClassName={style.virtuoso_grid}
          overscan={35}
          itemContent={(_, country) => (
            <CountryItem
              key={country.name}
              country={country}
              onSelect={(code) => navigate(`/countries/${code}`)}
            />
          )}
        ></VirtuosoGrid>
      )}
    </main>
  );
};

export default Countries;

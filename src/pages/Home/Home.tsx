import { Dropdown } from "../../components/Dropdown/Dropdown";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { regions } from "../../data/regions";

export const Home = () => {
  return (
    <>
      <SearchInput value="" onChange={() => {}} />
      <Dropdown options={regions} onSelectOption={() => {}} />
    </>
  );
};

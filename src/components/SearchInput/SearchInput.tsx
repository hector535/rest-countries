import { Icon } from "../Icon/Icon";
import style from "./Search.module.scss";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchInput = (props: SearchInputProps) => {
  const { value, onChange } = props;

  return (
    <div className={style.container}>
      <Icon name="search" />
      <input
        className={style.input}
        type="text"
        placeholder="Search for a country..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

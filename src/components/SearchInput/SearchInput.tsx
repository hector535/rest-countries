import { Icon } from "../Icon/Icon";
import clsx from "clsx";
import style from "./Search.module.scss";

type SearchInputProps = {
  value: string;
  className?: string;
  onChange: (value: string) => void;
};

export const SearchInput = (props: SearchInputProps) => {
  const { value, className, onChange } = props;

  return (
    <div className={clsx(className, style.container)}>
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

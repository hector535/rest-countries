import clsx from "clsx";
import { Icon } from "../Icon/Icon";
import { SearchInputProps } from "./types";
import style from "./Search.module.scss";

export const SearchInput = (props: SearchInputProps) => {
  const { className, ...restProps } = props;

  return (
    <div className={clsx(className, style.container)}>
      <Icon name="search" />
      <input type="search" className={style.input} {...restProps} />
    </div>
  );
};

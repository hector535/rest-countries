import clsx from "clsx";
import { Icon } from "@/components";
import { type SearchInputProps } from "./search-input.types";
import style from "./search-input.module.scss";

export const SearchInput = (props: SearchInputProps) => {
  const { className, ...restProps } = props;

  return (
    <div className={clsx(className, style.container)}>
      <Icon name="search" />
      <input type="text" className={style.input} {...restProps} />
    </div>
  );
};

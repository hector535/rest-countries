import clsx from "clsx";
import { TagProps } from "./types";
import style from "./Tag.module.scss";

export const Tag = (props: TagProps) => {
  const { className, children } = props;

  return <div className={clsx(style.tag, className)}>{children}</div>;
};

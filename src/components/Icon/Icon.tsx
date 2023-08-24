import clsx from "clsx";
import { ReactComponent as ArrowDown } from "../../assets/arrow-down.svg";
import { ReactComponent as ArrowLeft } from "../../assets/arrow-left.svg";
import { ReactComponent as Moon } from "../../assets/moon.svg";
import { ReactComponent as Sun } from "../../assets/sun.svg";
import { ReactComponent as Search } from "../../assets/search.svg";
import { IconProps } from "./types";
import style from "./Icon.module.scss";

export const Icon = (props: IconProps) => {
  const { name, className } = props;

  switch (name) {
    case "arrow-down":
      return <ArrowDown className={clsx(style.icon, className)} {...props} />;
    case "arrow-left":
      return <ArrowLeft className={clsx(style.icon, className)} {...props} />;
    case "search":
      return <Search className={clsx(style.icon, className)} {...props} />;
    case "moon":
      return <Moon {...props} />;
    case "sun":
      return <Sun {...props} />;
    default:
      return null;
  }
};

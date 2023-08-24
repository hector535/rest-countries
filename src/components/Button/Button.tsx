import clsx from "clsx";
import { ButtonProps } from "./types";
import style from "./Button.module.scss";

export const Button = (props: ButtonProps) => {
  const { text, icon, className, ...restProps } = props;

  return (
    <button
      className={clsx(
        style.button,
        { [style.button__icon]: !!icon },
        className
      )}
      {...restProps}
    >
      {!!icon && icon}
      {text}
    </button>
  );
};

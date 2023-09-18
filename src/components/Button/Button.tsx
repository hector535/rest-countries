import clsx from "clsx";
import { type ButtonProps } from "./button.types";
import style from "./button.module.scss";

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

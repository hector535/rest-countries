import clsx from "clsx";
import { LoadingSpinnerProps } from "./types";
import style from "./LoadingSpinner.module.scss";

export const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { className, size = "medium" } = props;

  return (
    <div
      className={clsx(
        className,
        style.loading_spinner,
        style[`loading_spinner--${size}`]
      )}
    ></div>
  );
};

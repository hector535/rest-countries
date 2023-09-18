import clsx from "clsx";
import { type LoadingSpinnerProps } from "./loading-spinner.types";
import style from "./loading-spinner.module.scss";

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

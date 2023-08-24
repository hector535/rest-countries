import clsx from "clsx";
import { ErrorViewProps } from "./types";
import style from "./ErrorView.module.scss";

export const ErrorView = (props: ErrorViewProps) => {
  const { fullscreen, error, resetErrorBoundary } = props;
  return (
    <div
      className={clsx(style.error_container, {
        [style.fullscreen]: !!fullscreen,
      })}
    >
      <h1>An error has occurred</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Refresh</button>
    </div>
  );
};

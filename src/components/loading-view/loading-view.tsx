import clsx from "clsx";
import { LoadingSpinner } from "@/components";
import { type LoadingViewProps } from "./loading-view.types";
import style from "./loading-vew.module.scss";

export const LoadingView = (props: LoadingViewProps) => {
  const { text, fullscreen } = props;

  return (
    <div
      className={clsx(style.loading_container, {
        [style.fullscreen]: !!fullscreen,
      })}
    >
      <h1>{text}</h1>
      <LoadingSpinner size="xLarge" />
    </div>
  );
};

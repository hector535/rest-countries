import { useRef } from "react";
import BaseSelect, { SelectInstance } from "react-select";
import { styles } from "./select.styles";
import { type SelectProps } from "./select.types";

export function Select<T>(props: SelectProps<T>) {
  const ref = useRef<SelectInstance<T>>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code !== "Enter") return;

    ref.current!.onMenuOpen();
  };

  return (
    <BaseSelect
      {...props}
      ref={ref}
      styles={styles}
      isSearchable={false}
      onKeyDown={handleKeyDown}
    />
  );
}

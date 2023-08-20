import { useState } from "react";
import { DropdownProps } from "../types/dropdown";

export const useDropdown = (props: DropdownProps) => {
  const { selectedValue, options, className, onSelectOption } = props;

  const [showOptions, setShowOptions] = useState(false);

  const selectedOption = options.find((o) => o.value === selectedValue);

  const handleClick = () => setShowOptions((prevState) => !prevState);

  const handleKeyDown = (e: React.KeyboardEvent, cb: () => void) => {
    if (e.code === "Space" || e.code === "Enter") cb();
  };

  return {
    className,
    showOptions,
    options,
    selectedOption,
    onSelectOption,
    setShowOptions,
    handleClick,
    handleKeyDown,
  };
};

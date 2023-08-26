import { CSSObjectWithLabel } from "react-select";

export const selectStyles = {
  control: (baseStyle: CSSObjectWithLabel) => ({
    ...baseStyle,
    borderRadius: `5px`,
    minHeight: `3rem`,
    minWidth: `12.5rem`,
    cursor: `pointer`,
    backgroundColor: `var(--bg-elements-color)`,
  }),
  placeholder: (baseStyle: CSSObjectWithLabel) => ({
    ...baseStyle,
    color: `var(--text-color)`,
  }),
  singleValue: (baseStyle: CSSObjectWithLabel) => ({
    ...baseStyle,
    color: `var(--text-color)`,
    fontSize: `0.75rem`,
  }),
  menu: (baseStyle: CSSObjectWithLabel) => ({
    ...baseStyle,
    backgroundColor: `var(--bg-elements-color)`,
  }),
  option: (
    baseStyle: CSSObjectWithLabel,
    { isSelected, isFocused }: { isSelected: boolean; isFocused: boolean }
  ) => {
    let color = "transparent";

    if (isSelected && isFocused) color = "#2684FF";
    else if (isSelected) color = "#2684FF";
    else if (isFocused) color = "hsla(216, 100%, 94%, 0.65)";

    return {
      ...baseStyle,
      fontSize: `0.75rem`,
      color: isSelected ? "#fff" : `var(--text-color)`,
      cursor: `pointer`,
      backgroundColor: color,
    };
  },
};

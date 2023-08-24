import clsx from "clsx";
import { Icon } from "../Icon/Icon";
import { useCloseElement } from "../../hooks/useCloseElement";
import { useDropdown } from "./useDropdown";
import { DropdownProps } from "./types";
import style from "./Dropdown.module.scss";

export const Dropdown = (props: DropdownProps) => {
  const {
    className,
    showOptions,
    options,
    selectedOption,
    setShowOptions,
    onSelectOption,
    handleClick,
    handleKeyDown,
  } = useDropdown(props);

  const dropdownRef = useCloseElement<HTMLDivElement>(() =>
    setShowOptions(false)
  );

  return (
    <div
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) =>
        handleKeyDown(e, () => setShowOptions((prevState) => !prevState))
      }
      className={clsx(className, style.dropdown)}
      ref={dropdownRef}
    >
      <p>{selectedOption ? selectedOption.name : "Select an option"}</p>

      <Icon name="arrow-down" />

      {showOptions && (
        <ul className={style.list}>
          {options.map((option, idx) => (
            <li
              tabIndex={0}
              className={style.item}
              key={idx}
              onClick={() => onSelectOption(option.value)}
              onKeyDown={(e) =>
                handleKeyDown(e, () => onSelectOption(option.value))
              }
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

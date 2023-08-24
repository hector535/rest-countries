import { useState, useEffect } from "react";
import { Icon } from "../Icon/Icon";
import { Mode } from "./types";
import style from "./ThemeSwitcher.module.scss";

const getModeFromLocalStorage = (): Mode => {
  return (localStorage.getItem("theme") as Mode) || "light";
};

export const ThemeSwitcher = () => {
  const [mode, setMode] = useState<Mode>(getModeFromLocalStorage);

  const iconName = mode === "dark" ? "sun" : "moon";
  const buttonText = mode === "dark" ? "Light Mode" : "Dark Mode";
  const nextMode = mode === "dark" ? "light" : "dark";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
  }, [mode]);

  const handleThemeSwitcherClick = () => {
    setMode(nextMode);
  };

  return (
    <button className={style.theme_switcher} onClick={handleThemeSwitcherClick}>
      <Icon name={iconName} width={16} height={16} />
      {buttonText}
    </button>
  );
};

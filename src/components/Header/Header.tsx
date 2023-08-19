import { Icon } from "../Icon/Icon";
import style from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={style.header}>
      <h1 className={style.title}>Where in the world?</h1>

      <button className={style.theme_switcher}>
        <Icon name="moon" width={16} height={16} />
        Dark Mode
      </button>
    </header>
  );
};

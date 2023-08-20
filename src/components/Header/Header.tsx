import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import style from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <h1 className={style.title}>Where in the world?</h1>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

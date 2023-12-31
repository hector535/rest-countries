import { Link } from "react-router-dom";
import { ThemeSwitcher } from "@/components";
import style from "./header.module.scss";

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link to="/countries">Where in the world?</Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

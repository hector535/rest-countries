import { ReactComponent as ArrowDown } from "../../assets/arrow-down.svg";
import { ReactComponent as ArrowLeft } from "../../assets/arrow-left.svg";
import { ReactComponent as Moon } from "../../assets/moon.svg";
import { ReactComponent as Sun } from "../../assets/sun.svg";
import { ReactComponent as Search } from "../../assets/search.svg";

type BaseProps = React.ComponentPropsWithoutRef<"svg">;

type IconProps = BaseProps & {
  name: "arrow-down" | "arrow-left" | "moon" | "search" | "sun";
};

export const Icon = (props: IconProps) => {
  const { name } = props;

  switch (name) {
    case "arrow-down":
      return <ArrowDown {...props} />;
    case "arrow-left":
      return <ArrowLeft {...props} />;
    case "moon":
      return <Moon {...props} />;
    case "search":
      return <Search {...props} />;
    case "sun":
      return <Sun {...props} />;
    default:
      return null;
  }
};

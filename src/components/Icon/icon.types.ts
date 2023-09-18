type BaseProps = React.ComponentPropsWithoutRef<"svg">;

export type IconProps = BaseProps & {
  name: "arrow-down" | "arrow-left" | "moon" | "search" | "sun";
};

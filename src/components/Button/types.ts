type ButtonBase = React.ComponentPropsWithoutRef<"button">;

export type ButtonProps = ButtonBase & {
  text: string;
  icon: React.ReactNode;
};

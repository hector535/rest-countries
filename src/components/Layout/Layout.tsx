import { Header } from "../Header/Header";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

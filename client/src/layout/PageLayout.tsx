import type { ReactNode } from "react";

interface PageLayoutProps {
  navbar: ReactNode;
  children: ReactNode;
}

const PageLayout = ({ navbar, children }: PageLayoutProps) => {
  return (
    <>
      {navbar}
      {children}
    </>
  );
};

export default PageLayout;

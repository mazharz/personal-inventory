import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-dark-900 text-light-900 flex min-h-screen items-stretch">
      {children}
    </div>
  );
};

export { Layout };

import { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return <main className="flex flex-col flex-1 min-h-screen items-center justify-start">{children}</main>;
};
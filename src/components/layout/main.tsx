import { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return <main className="flex min-h-screen flex-col items-center justify-between p-24">{children}</main>;
};
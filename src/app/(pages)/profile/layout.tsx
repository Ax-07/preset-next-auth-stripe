import { MainLayout } from "@/components/layout/main";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <MainLayout>{children}</MainLayout>;
}

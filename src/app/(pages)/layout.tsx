import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/header";
import { MainLayout } from "@/components/layout/main";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <MainLayout>{children}</MainLayout>
      <Footer />
    </>
  );
}

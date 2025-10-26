import { Header } from "@/components/layout/header";
import { MainLayout } from "@/components/layout/main";
import { Hero } from "@/components/sections/hero";
import PricingClient from "@/lib/stripe/components/pricing";
import { getStripePlans } from "@/lib/stripe/stripe-server";

export default async function Home() {
  const result = await getStripePlans();
  const plans = result.plans || [];
  const error = result.error;

  if (error) {
    console.error("Erreur lors du chargement des prix:", error);
  }
  return (
    <>
      <Header />
      <MainLayout>
        <Hero />
        <PricingClient plans={plans} />
      </MainLayout>
    </>
  );
}

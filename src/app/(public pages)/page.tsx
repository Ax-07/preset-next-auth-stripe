import { Hero } from "@/components/sections/hero";
import PricingClient from "@/lib/stripe/components/pricing";
import { getStripePlans } from "@/lib/stripe/stripe-plan";

export default async function Home() {
  const result = await getStripePlans(); console.log(result);
  const plans = result.plans || [];
  const error = result.error;

  if (error) {
    console.error("Erreur lors du chargement des prix:", error);
  }
  return (
    <>
      <Hero />
      <PricingClient plans={plans} />
    </>
  );
}

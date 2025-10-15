import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export const subscribe = async (plan: string, successUrl: string, cancelUrl: string) => {
  const result = await auth.api.upgradeSubscription({
    headers: await headers(),
    body: {
      plan,
      successUrl,
      cancelUrl,
    },
  });


  return result;
};
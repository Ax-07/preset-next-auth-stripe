import { authClient } from "@/lib/auth/auth-client";

export const ManageSubscriptionBtn = async () => {
  const { data } = await authClient.subscription.billingPortal({
    returnUrl: "/account",
  });
  if (data?.url) location.href = data.url;
};

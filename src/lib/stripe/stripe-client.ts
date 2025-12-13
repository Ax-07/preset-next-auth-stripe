import { headers } from "next/headers";
import { auth } from "../auth/auth";

/**
 * Récupère l'abonnement actif de l'utilisateur.
 * @returns Données de l'abonnement actif
 */
export const getActiveSubscription = async () => {
  try {
    const subscriptions = await auth.api.listActiveSubscriptions({ headers: await headers() }); console.log("Active subscriptions:", subscriptions);
    return { success: true, data: subscriptions };
  } catch (error) {
    console.error("Error fetching active subscriptions:", error);
    return { success: false, error };
  }
};
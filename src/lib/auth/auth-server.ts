"use server";

import { redirect } from "next/navigation";
import { auth } from "./auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  return session;
};

export const getUser = async () => {
  const session = await getSession();
  return session?.user;
}

export const signOut = async () => {
  await auth.api.signOut({ headers: await headers() });
  redirect("/");
};

/**
 * Vérifie le token de vérification d'email.
 * @param token Le token de vérification d'email.
 * @returns 
 */
export const verifyEmail = async (token: string) => {
  try {
    const result = await auth.api.verifyEmail({
      headers: await headers(),
      query: { token }
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Error verifying email:", error);
    return { success: false, error };
  }
};

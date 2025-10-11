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
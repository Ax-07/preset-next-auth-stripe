
import { getUser } from "@/lib/auth/auth-server";
import { Navigation } from "../navigations";
import { User } from "better-auth";

export const Header = async () => {
    const user = await getUser();

  return (
    <Navigation user={user as User} />
  );
};

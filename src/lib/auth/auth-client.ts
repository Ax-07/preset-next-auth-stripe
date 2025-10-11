import { createAuthClient } from "better-auth/react"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export const authClient = createAuthClient({})
export const { useSession, signIn, signOut, signUp} = authClient

export type ProviderEnum = Parameters<typeof signIn.social>[0]["provider"];

export const useAuthentification = () => {
  const { signIn, signUp } = authClient;
  const router = useRouter();

  const signUpWithCredential = async (data: { name: string; email: string; password: string; }) => {
    return await signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (user) => {
          console.log("User signed up successfully:", user);
          router.push("/profile");
        },
        onError: (error) => {
          console.error("Error signing up:", error);
          toast.error("Error signing up: " + error.error.message);
        },
      }
    );
  };

  const signInWithCredential = async (data: { email: string; password: string; }) => {
    return await signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (user) => {
          console.log("User signed up successfully:", user);
          router.push("/profile");
        },
        onError: (error) => {
          console.error("Error signing up:", error);
          toast.error("Error signing up: " + error.error.message);
        },
      }
    );
  }

  const signInWithProvider = async (provider: ProviderEnum) => {
    await signIn.social(
      { provider, callbackURL: "/profile" },
      {
        onSuccess: () => {},
        onError: (error) => {
          console.error("Error signing in:", error);
          toast.error("Error signing in: " + error.error.message);
        },
      }
    );
  };

  return { signInWithCredential, signInWithProvider, signUpWithCredential };
}

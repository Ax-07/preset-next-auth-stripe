import { createAuthClient } from "better-auth/react"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AUTH_MESSAGES, formatErrorMessage, getErrorMessage } from "./auth-messages";
import { stripeClient } from "@better-auth/stripe/client"

export const authClient = createAuthClient({
      plugins: [
        stripeClient({
            subscription: true // expose client.subscription.
        })
    ]
})
export const { useSession, signIn, signOut, signUp } = authClient

export type ProviderEnum = Parameters<typeof signIn.social>[0]["provider"];

export const useAuthentification = () => {
  const { signIn, signUp, sendVerificationEmail } = authClient;
  const router = useRouter();

  const signUpWithCredential = async (data: { name: string; email: string; password: string; }) => {
    return await signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/auth/verify-email",
      },
      {
        onSuccess: (user) => {
          console.log("Utilisateur inscrit avec succès:", user);
          toast.success(AUTH_MESSAGES.success.signUp);
          // Redirige vers la page de vérification d'email
          router.push(`/auth/check-email?email=${encodeURIComponent(data.email)}`);
        },
        onError: (error) => {
          console.error("Erreur lors de l'inscription:", error);
          const errorMessage = getErrorMessage(error.error.code, AUTH_MESSAGES.error.signUp);
          toast.error(formatErrorMessage(errorMessage, error.error.message));
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
          console.log("Utilisateur connecté avec succès:", user);
          toast.success(AUTH_MESSAGES.success.signIn);
          router.refresh(); // Rafraîchit les Server Components
          router.push("/profile");
        },
        onError: (error) => {
          console.error("Erreur lors de la connexion:", error);
          const errorMessage = getErrorMessage(error.error.code, AUTH_MESSAGES.error.signIn);
          toast.error(formatErrorMessage(errorMessage, error.error.message));
        },
      }
    );
  }

  const signInWithProvider = async (provider: ProviderEnum) => {
    await signIn.social(
      { provider, callbackURL: "/profile" },
      {
        onSuccess: () => {
          toast.success(AUTH_MESSAGES.success.signIn);
        },
        onError: (error) => {
          console.error("Erreur lors de la connexion:", error);
          const errorMessage = getErrorMessage(error.error.code, AUTH_MESSAGES.error.signIn);
          toast.error(formatErrorMessage(errorMessage, error.error.message));
        },
      }
    );
  };

  const resendVerificationEmail = async (email: string) => {
    try {
      await sendVerificationEmail({
        email,
        callbackURL: "/auth/verify-email"
      });
      toast.success(AUTH_MESSAGES.success.verificationEmailSent);
      return true;
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      const errorMessage = error instanceof Error ? error : undefined;
      toast.error(formatErrorMessage(AUTH_MESSAGES.error.verificationEmail, errorMessage));
      return false;
    }
  };

  return { signInWithCredential, signInWithProvider, signUpWithCredential, resendVerificationEmail };
}

export const useProfile = () => {
  const { updateUser, deleteUser, forgetPassword, resetPassword } = authClient;
  const router = useRouter();
  const user = useSession().data?.user;

  const updateProfile = async (data: { name: string; image: string | null; }) => {
    return await updateUser(data, {
      onSuccess: () => {
        toast.success(AUTH_MESSAGES.success.profileUpdated);
        router.push("/profile");
      },
      onError: (error) => {
        console.error("Erreur lors de la mise à jour:", error);
        toast.error(formatErrorMessage(AUTH_MESSAGES.error.profileUpdate, error.error.message));
      },
    });
  };

  const forgetUserPassword = async (email: string) => {
    return await forgetPassword({
      email,
      redirectTo: "/auth/reset-password"
    }, {
      onSuccess: () => {
        console.log("Email de réinitialisation envoyé");
        toast.success(AUTH_MESSAGES.success.passwordResetEmailSent);
        router.push(`/auth/verify?email=${email}`);
        router.refresh();
      },
      onError: (error) => {
        console.error("Erreur lors de l'envoi de l'email:", error);
        toast.error(formatErrorMessage(AUTH_MESSAGES.error.passwordResetEmail, error.error.message));
      },
    });
  };

  const resetUserPassword = async (token: string, newPassword: string) => {
    return await resetPassword({
      newPassword,
      token,
    }, {
      onSuccess: () => {
        console.log("Mot de passe réinitialisé");
        toast.success(AUTH_MESSAGES.success.passwordReset);
        router.push("/auth/signin");
      },
      onError: (error) => {
        console.error("Erreur lors de la réinitialisation:", error);
        const errorMessage = getErrorMessage(error.error.code, AUTH_MESSAGES.error.passwordReset);
        toast.error(formatErrorMessage(errorMessage, error.error.message));
      },
    });
  };

  const removeProfile = async () => {
    if (!confirm(AUTH_MESSAGES.confirm.deleteAccount)) {
      return;
    }

    try {
      // Suppression directe du compte
      await deleteUser({
        callbackURL: "/"
      });
      toast.success(AUTH_MESSAGES.success.accountDeleted);
      router.push("/profile/delete/verify");
      router.refresh();
    } catch (error: unknown) {
      console.error("Erreur lors de la suppression:", error);
      const errorMessage = (error as { error?: { message?: string }; message?: string })?.error?.message || (error as { message?: string })?.message || "Erreur inconnue";
      toast.error(formatErrorMessage(AUTH_MESSAGES.error.accountDelete, errorMessage));
    }
  };

  return { user, updateProfile, forgetUserPassword, resetUserPassword, removeProfile };
};
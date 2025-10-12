import { getUser, signOut } from "@/lib/auth/auth-server";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOutIcon, User2 } from "lucide-react";
import { AvatarImage } from "@radix-ui/react-avatar";

export const AuthButtons = async () => {
  const user = await getUser();

  if (!user) {
    return (
      <Link href="/auth/signin" className={buttonVariants({ size: "sm", variant: "outline" })}>
        Se connecter
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Avatar className="size-7">
            <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
            <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          {user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2 w-full">
            <User2 className="size-4" />
            Mon compte
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form>
            <button
              formAction={async () => {
                "use server";
                await signOut();
              }}
              className="flex items-center gap-2 w-full"
            >
              <LogOutIcon className="size-4" />
              Se déconnecter
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

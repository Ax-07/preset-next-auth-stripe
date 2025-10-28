import { getUser, signOut } from "@/lib/auth/auth-server";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOutIcon, Trash2, User2, CreditCard, Crown } from "lucide-react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { LogoutButton } from "./logout-btn";
import { User } from "better-auth";

export const AuthButtons = ({user}: {user: User}) => {

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
          <Link href="/dashboard/account" className="flex items-center gap-2 w-full">
            <User2 className="size-4" />
            Mon compte
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/subscription" className="flex items-center gap-2 w-full">
            <CreditCard className="size-4" />
            Mon abonnement
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/pricing" className="flex items-center gap-2 w-full">
            <Crown className="size-4" />
            Voir les plans
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/account/delete"
            className="flex items-center gap-2 w-full text-destructive hover:text-destructive/90"
          >
            <Trash2 className="size-4" />
            Supprimer mon compte
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import Link from "next/link";
import { buttonVariants } from "../ui/button";

export const Header = () => {
  return (
    <header className="flex items-center justify-between border-b px-4 py-2">
      <Link href="/" className="text-lg font-bold">
        MyApp
      </Link>
      <Link href="/auth/signup" className={buttonVariants({ size: "sm", variant: "outline" })}>
        Sign up
      </Link>
    </header>
  );
};

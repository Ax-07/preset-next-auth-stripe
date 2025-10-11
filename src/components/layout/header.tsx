import Link from "next/link";
import { AuthButtons } from "../../lib/auth/auth-buttons";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

export const Header = () => {
  return (
    <header className="flex items-center justify-between border-b px-4 py-2">
      <Link href="/" className="text-lg font-bold">
        MyApp
      </Link>
      <Suspense fallback={<Skeleton className="h-9 w-32" />}>
        <AuthButtons />
      </Suspense>
    </header>
  );
};

import Link from "next/link";
import { Suspense } from "react";
import { AuthButtons } from "@/lib/auth/components/buttons/auth-buttons";
import { Skeleton } from "../ui/skeleton";

export const Header = () => {
  return (
    <header className="flex items-center justify-between w-full border-b px-4 py-2">
      <Link href="/" className="text-lg font-bold">
        MyApp
      </Link>
      <div className="flex items-center gap-3">
        <Suspense fallback={<Skeleton className="h-9 w-32" />}>
          <AuthButtons />
        </Suspense>
      </div>
    </header>
  );
};

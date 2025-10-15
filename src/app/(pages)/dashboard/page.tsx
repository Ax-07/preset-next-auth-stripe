// app/(pages)/dashboard/page.tsx

import { Suspense } from "react";
import DashboardPage from "@/components/pages/dashboard";
import { Loader2 } from "lucide-react";

function DashboardLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardPage />
    </Suspense>
  );
}
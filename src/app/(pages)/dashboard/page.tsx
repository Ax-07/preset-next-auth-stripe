// app/(pages)/dashboard/page.tsx

import { Suspense } from "react";
import DashboardPage from "@/components/pages/dashboard";
import { Loader2 } from "lucide-react";
import { getActiveSubscription } from "@/lib/stripe/stripe-server";

function DashboardLoading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

export default async function Page() {
  const activeSubscription = await getActiveSubscription(); console.log("Active subscription in Dashboard page:", activeSubscription);

  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardPage />
    </Suspense>
  );
}
import {
  SidebarInset,
  SidebarProvider,
} from "@/app/components/shadcn-ui/sidebar";

import { Suspense } from "react";
import EncyclopediaSideBarDataFetcher from "./components/EncyclopediaSideBarDataFetcher";
import SideBarSkeleton from "./components/SideBarSkeleton";

export default async function EncyclopediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Suspense fallback={<SideBarSkeleton />}>
        <EncyclopediaSideBarDataFetcher />
      </Suspense>

      <SidebarInset className="flex items-center">{children}</SidebarInset>
    </SidebarProvider>
  );
}

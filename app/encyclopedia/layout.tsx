import {
  SidebarInset,
  SidebarProvider,
} from "@/app/components/shadcn-ui/sidebar";

import { Suspense } from "react";
import SideBarSkeleton from "./components/SideBarSkeleton";
import EncyclopediaSideBar from "./components/EncyclopediaSideBar";

export default async function EncyclopediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const plants = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/plants/list`
  ).then((response) => response.json());
  const families = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/families/list`
  ).then((response) => response.json());
  const genuses = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/genuses/list`
  ).then((response) => response.json());

  return (
    <SidebarProvider>
      <Suspense fallback={<SideBarSkeleton />}>
        <EncyclopediaSideBar data={{ plants, families, genuses }} />
      </Suspense>

      <SidebarInset className="flex items-center">{children}</SidebarInset>
    </SidebarProvider>
  );
}

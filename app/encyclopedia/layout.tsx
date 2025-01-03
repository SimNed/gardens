import {
  SidebarInset,
  SidebarProvider,
} from "@/app/components/shadcn-ui/sidebar";
import { getEncyclopediaListedData } from "../actions/encyclopedia";

import EncyclopediaSideBar from "./components/EncyclopediaSideBar";

export default async function EncyclopediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getEncyclopediaListedData();

  return (
    <SidebarProvider>
      <EncyclopediaSideBar data={data} />

      <SidebarInset className="flex items-center">{children}</SidebarInset>
    </SidebarProvider>
  );
}

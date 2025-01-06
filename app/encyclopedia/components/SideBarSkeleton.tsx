import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
} from "../../components/shadcn-ui/sidebar";
import { Separator } from "../../components/shadcn-ui/separator";
import { Skeleton } from "../../components/shadcn-ui/skeleton";

export default function SideBarSkeleton() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader className="p-4">
        <Skeleton className="h-10 w-full rounded-full" />
        <Skeleton className="h-8 w-full my-4" />
      </SidebarHeader>
      <Separator className="w-5/6 m-auto" />
      <SidebarContent className="p-4">
        <SidebarMenu>
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

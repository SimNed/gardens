import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/app/components/shadcn-ui/sidebar";
import { Search, RefreshCcw } from "lucide-react";

interface FiltersHeaderProps {
  resetFilters: () => void;
}

const SearchSidebarHeader = ({ resetFilters }: FiltersHeaderProps) => {
  return (
    <SidebarHeader className="p-4">
      <SidebarMenu>
        <SidebarMenuItem className="grid grid-cols-[8fr_1fr] items-center">
          <div className="flex gap-4 items-center">
            <Search className="text-black rounded-full  p-1" />
            <h1 className="text-sm">Filtres</h1>
          </div>
          <SidebarMenuButton
            className="hover:cursor-pointer"
            asChild
            onClick={() => resetFilters()}
          >
            <RefreshCcw />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default SearchSidebarHeader;

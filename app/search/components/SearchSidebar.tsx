"use client";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/app/components/shadcn-ui/sidebar";

import { Separator } from "@/app/components/shadcn-ui/separator";

import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";
import Section from "@/app/components/ui/Section";
import useSearch from "@/app/lib/hooks/use-search";
import { PlantSearchType } from "@/types/search";

const SearchSidebar = () => {
  const {
    filters,
    updateFilters,
    deleteFilter,
    resetFilters,
    doRequest,
    results,
  } = useSearch<PlantSearchType>();

  return (
    <SidebarProvider>
      <SearchForm
        filters={filters}
        updateFilters={updateFilters}
        deleteFilter={deleteFilter}
        resetFilters={resetFilters}
        doRequest={doRequest}
      />
      <SidebarInset>
        <header className="flex sticky top-0 h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <Section variant="xl" className="justify-start mx-auto">
          <SearchResult results={results} />
        </Section>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SearchSidebar;

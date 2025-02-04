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

  console.log("RESULT IN BAR", results);

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

// "use client";

// import { useState } from "react";
// import useSWR from "swr";
// import { fetcher } from "@/app/lib/fetcher";

// import {
//   SidebarProvider,
//   SidebarInset,
//   SidebarTrigger,
// } from "@/app/components/shadcn-ui/sidebar";

// import { Separator } from "@/app/components/shadcn-ui/separator";

// import SearchForm from "./SearchForm";
// import { SearchFormType, SearchRequestType } from "@/types/search";
// import { convertFormToRequest } from "@/app/lib/utils/search";
// import SearchResult from "./SearchResult";
// import Section from "@/app/components/ui/Section";

// const SearchSidebar = () => {
//   const [filteredRequest, setFilteredRequest] = useState<SearchRequestType>({});

//   const [shouldFetch, setShouldFetch] = useState(false);

//   const { data: results } = useSWR(
//     shouldFetch
//       ? `/api/plants/filtred?${new URLSearchParams(filteredRequest)}`
//       : null,
//     fetcher
//   );

//   function handleFilteredRequest(filterForm: SearchFormType) {
//     if (!filterForm) return {};

//     const request = convertFormToRequest(filterForm);

//     setFilteredRequest({ ...request });
//     setShouldFetch(true);
//   }

//   return (
//     <SidebarProvider>
//       <SearchForm />
//       <SidebarInset>
//         <header className="flex sticky top-0 h-16 shrink-0 items-center gap-2">
//           <div className="flex items-center gap-2 px-4">
//             <SidebarTrigger className="-ml-1" />
//             <Separator orientation="vertical" className="mr-2 h-4" />
//           </div>
//         </header>
//         <Section variant="xl" className="justify-start mx-auto">
//           {results && <SearchResult results={results} />}
//         </Section>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// };

// export default SearchSidebar;

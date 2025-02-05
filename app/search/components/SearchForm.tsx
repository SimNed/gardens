"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenuButton,
} from "@/app/components/shadcn-ui/sidebar";

import { Separator } from "@/app/components/shadcn-ui/separator";
import FiltersHeader from "./SearchSidebarHeader";
import FiltersGroup from "./FiltersGroup";
import FiltersBadgeGroup from "./FiltersBadgeGroup";
import { PlantSearchType, RequestFilterType } from "@/types/search";
import SunExposureSelect from "@/app/components/ui/options/SunExposureSelect";
import WaterNeedSelect from "@/app/components/ui/options/WaterNeedSelect";
import GenusSelect from "@/app/components/ui/options/GenusSelect";
import FamilySelect from "@/app/components/ui/options/FamilySelect";
import LifeCycleSelect from "@/app/components/ui/options/LifeCycleSelect";
import CategorySelect from "@/app/components/ui/options/CategorySelect";
import ColdHardinessInput from "@/app/components/ui/options/ColdHardinessInput";

interface SearchFormProps {
  filters: RequestFilterType<PlantSearchType>;
  updateFilters: (filter: RequestFilterType<PlantSearchType>) => void;
  deleteFilter: (key: keyof PlantSearchType) => void;
  resetFilters: () => void;
  doRequest: () => void;
}

const SearchForm = ({
  filters,
  updateFilters,
  deleteFilter,
  resetFilters,
  doRequest,
  ...props
}: SearchFormProps) => {
  return (
    <Sidebar variant="inset" {...props}>
      <FiltersHeader resetFilters={resetFilters} />
      <Separator className="mb-2" />
      <SidebarContent>
        <FiltersGroup label={"Taxonomie"}>
          <FamilySelect
            value={filters.familyId || ""}
            onValueChange={(data) => {
              updateFilters({ familyId: data });
            }}
          />
          <GenusSelect
            value={filters.genusId || ""}
            onValueChange={(data) => {
              updateFilters({ genusId: data });
            }}
          />
        </FiltersGroup>

        {(filters.familyId || filters.genusId) && (
          <FiltersBadgeGroup
            badges={[]}
            onDelete={(key: keyof PlantSearchType) => {
              if (filters.genusId && key === "familyId") return;
              deleteFilter(key);
            }}
          />
        )}
        <Separator />

        <FiltersGroup label={"Type"}>
          <CategorySelect
            value={filters.plantCategoryId || ""}
            onValueChange={(data) => updateFilters({ plantCategoryId: data })}
          />
          <LifeCycleSelect
            value={filters.lifeCycle || ""}
            onValueChange={(data) => updateFilters({ lifeCycle: data })}
          />
        </FiltersGroup>
        {(filters.plantCategoryId || filters.lifeCycle) && (
          <FiltersBadgeGroup badges={[]} onDelete={deleteFilter} />
        )}
        <Separator />

        <FiltersGroup label={"Environnement"}>
          <WaterNeedSelect
            value={filters.waterNeed || ""}
            onValueChange={(data) => updateFilters({ waterNeed: data })}
          />
          <SunExposureSelect
            value={filters.sunExposure || ""}
            onValueChange={(data) => updateFilters({ sunExposure: data })}
          />
          <ColdHardinessInput
            value={filters.coldHardiness ? parseInt(filters.coldHardiness) : 0}
            onValueChange={(data) => updateFilters({ coldHardiness: data })}
          />
        </FiltersGroup>
        {(filters.waterNeed ||
          filters.sunExposure ||
          filters.coldHardiness) && (
          <FiltersBadgeGroup badges={[]} onDelete={deleteFilter} />
        )}
        <Separator />
      </SidebarContent>
      <SidebarFooter className="py-4">
        <SidebarMenuButton size="lg" onClick={() => doRequest()} asChild>
          <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-foreground text-sidebar-primary-foreground hover:cursor-pointer">
            chercher
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SearchForm;

"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarCombobox,
  SidebarContent,
  SidebarFooter,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { useState } from "react";

import FiltersHeader from "./FiltersHeader";
import { FilterOptionsProps } from "@/types/filters/filter-option";
import FiltersGroup from "./FiltersGroup";
import { FiltersProps, FiltersType } from "@/types/filters/filter";
import FiltersBadgeGroup from "./FiltersBadgeGroup";

type FiltersSideBarProps = React.ComponentProps<typeof Sidebar> & {
  filtersOptions: FilterOptionsProps;
};

type BadgeGroupType = Partial<Record<keyof FiltersProps, string>>;

const taxonomyBadgeGroup: BadgeGroupType = {
  family: "famille",
  genus: "genre",
};

const environmentBadgeGroup: BadgeGroupType = {
  waterNeed: "eau",
  sunExposure: "exposition",
};

const FiltersSideBar = ({ filtersOptions, ...props }: FiltersSideBarProps) => {
  const [filters, setFilters] = useState<FiltersType>({});

  function handleFilters(newFilters: FiltersType) {
    if (newFilters.genus) {
      if (!filters.family) {
        newFilters.family = newFilters.genus.relation;
      }
    }

    if (newFilters.family) {
      if (
        filters.genus &&
        filters.genus.relation?.id !== newFilters.family.id
      ) {
        delete filters.genus;
      }
    }
    setFilters({ ...filters, ...newFilters });
  }

  function deleteFilter(key: string) {
    if (filters.genus && key === "family") return;

    const tempFilters = { ...filters };

    if (!tempFilters[key as keyof FiltersProps]) return;

    delete tempFilters[key as keyof FiltersProps];
    setFilters({ ...tempFilters });
  }

  function resetFilters() {
    setFilters({});
  }

  function generateBadges(badgeGroup: BadgeGroupType) {
    const filtersByCategory = Object.entries(filters).filter(([key]) =>
      badgeGroup.hasOwnProperty(key)
    );

    return filtersByCategory.length > 0
      ? filtersByCategory.map(([key, filter]) => {
          return {
            key: key as keyof FiltersProps,
            category: badgeGroup[key as keyof BadgeGroupType]!,
            label: filter.label,
          };
        })
      : [];
  }

  function getFilteredGenusOptions() {
    return filters.family
      ? filtersOptions.genus.filter(
          (option) => option.relation?.id === filters.family?.id
        )
      : filtersOptions.genus;
  }

  return (
    <Sidebar variant="inset" {...props}>
      <FiltersHeader resetFilters={resetFilters} />
      <Separator />
      <SidebarContent>
        <FiltersGroup label={"Taxonomie"}>
          <SidebarCombobox
            label={"Famille"}
            data={filtersOptions.family}
            selectValue={filters.family?.id || ""}
            onSelectChange={(data) => {
              handleFilters({ family: data });
            }}
          />
          <SidebarCombobox
            label={"Genre"}
            data={getFilteredGenusOptions()}
            selectValue={filters.genus?.id || ""}
            onSelectChange={(data) => {
              handleFilters({ genus: data });
            }}
          />
        </FiltersGroup>
        {(filters.family || filters.genus) && (
          <FiltersBadgeGroup
            badges={generateBadges(taxonomyBadgeGroup)}
            onDelete={deleteFilter}
          />
        )}
        <Separator />
        <FiltersGroup label={"Environnement"}>
          <SidebarCombobox
            label={"Besoin en eau"}
            data={filtersOptions.waterNeed}
            selectValue={filters.waterNeed?.id || ""}
            onSelectChange={(data) => {
              handleFilters({ waterNeed: data });
            }}
          />
          <SidebarCombobox
            label={"Exposition"}
            data={filtersOptions.sunExposure}
            selectValue={filters.sunExposure?.id || ""}
            onSelectChange={(data) => {
              handleFilters({ sunExposure: data });
            }}
          />
        </FiltersGroup>
        {(filters.waterNeed || filters.sunExposure) && (
          <FiltersBadgeGroup
            badges={generateBadges(environmentBadgeGroup)}
            onDelete={deleteFilter}
          />
        )}
        <Separator />
      </SidebarContent>
      <SidebarFooter className="py-4">
        <SidebarMenuButton size="lg" asChild>
          <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-foreground text-sidebar-primary-foreground">
            chercher
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};

export default FiltersSideBar;

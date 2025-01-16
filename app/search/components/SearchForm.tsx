"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenuButton,
} from "@/app/components/shadcn-ui/sidebar";

import { Separator } from "@/app/components/shadcn-ui/separator";
import { useState } from "react";

import FiltersHeader from "./SearchSidebarHeader";
import FiltersGroup from "./FiltersGroup";
import FiltersBadgeGroup from "./FiltersBadgeGroup";
import { SearchFormOptionProps, SearchFormType } from "@/types/search";
import SelectInput from "@/app/components/inputs/SelectInput";
import NumberInput from "@/app/components/inputs/NumberInput";
import { LifeCycle, SunExposure, WaterNeed } from "@prisma/client";
import ComboBoxInput from "@/app/components/inputs/ComboBoxInput";

type BadgeGroupType = Partial<Record<keyof SearchFormType, string>>;

const taxonomyBadgeGroup: BadgeGroupType = {
  family: "famille",
  genus: "genre",
};

const typeBadgeGroup: BadgeGroupType = {
  category: "catégorie",
  lifeCycle: "cycle",
};

const environmentBadgeGroup: BadgeGroupType = {
  waterNeed: "eau",
  sunExposure: "exposition",
  coldHardiness: "rusticité",
};

type FiltersSideBarProps = React.ComponentProps<typeof Sidebar> & {
  options: SearchFormOptionProps;
  handleFilteredRequest: (formFilters: SearchFormType) => void;
};

const SearchForm = ({
  options,
  handleFilteredRequest,
  ...props
}: FiltersSideBarProps) => {
  const [formFilters, setFormFilters] = useState<SearchFormType>({});

  function handleFilters(filters: SearchFormType) {
    if (filters.genus && !formFilters.family) {
      filters.family = filters.genus.value.relation;
    }

    if (
      filters.family &&
      filters.genus &&
      filters.genus.value.relation.value !== filters.family.value
    ) {
      delete filters.genus;
    }

    setFormFilters({ ...formFilters, ...filters });
  }

  function deleteFilter(key: string) {
    if (formFilters.genus && key === "family") return;

    const tempFilterForm = { ...formFilters };

    if (!tempFilterForm[key as keyof SearchFormType]) return;

    delete tempFilterForm[key as keyof SearchFormType];
    setFormFilters({ ...tempFilterForm });
  }

  function resetFilters() {
    setFormFilters({});
  }

  function generateBadges(badgeGroup: BadgeGroupType) {
    const filtersByCategory = Object.entries(formFilters).filter(([key]) =>
      badgeGroup.hasOwnProperty(key)
    );

    return filtersByCategory.length > 0
      ? filtersByCategory.map(([key, filter]) => {
          return {
            key: key as keyof SearchFormType,
            category: badgeGroup[key as keyof BadgeGroupType]!,
            label: filter.key.toLowerCase(),
          };
        })
      : [];
  }

  function getFilteredGenusOptions() {
    return formFilters.family
      ? options.genus.filter(
          (option) => option.value.relation.value === formFilters.family?.value
        )
      : options.genus;
  }

  return (
    <Sidebar variant="inset" {...props}>
      <FiltersHeader resetFilters={resetFilters} />
      <Separator className="mb-2" />
      <SidebarContent>
        <FiltersGroup label={"Taxonomie"}>
          <ComboBoxInput
            label={"Famille"}
            data={options.family}
            selectValue={formFilters.family?.value || ""}
            onSelectChange={(data) => {
              handleFilters({ family: data });
            }}
          />
          <ComboBoxInput
            label={"Genre"}
            data={getFilteredGenusOptions()}
            selectValue={formFilters.genus?.value || ""}
            onSelectChange={(data) => {
              handleFilters({ genus: data });
            }}
          />
        </FiltersGroup>
        {(formFilters.family || formFilters.genus) && (
          <FiltersBadgeGroup
            badges={generateBadges(taxonomyBadgeGroup)}
            onDelete={deleteFilter}
          />
        )}
        <Separator />

        <FiltersGroup label={"Type"}>
          <SelectInput<string>
            options={options.category}
            selectValue={formFilters.category?.value || ""}
            label="Catégorie"
            onValueChange={(data) => handleFilters({ category: data })}
          />
          <SelectInput<LifeCycle>
            options={options.lifeCycle}
            selectValue={formFilters.lifeCycle?.value || ""}
            label="Cycle"
            onValueChange={(data) => handleFilters({ lifeCycle: data })}
          />
        </FiltersGroup>
        {(formFilters.category || formFilters.lifeCycle) && (
          <FiltersBadgeGroup
            badges={generateBadges(typeBadgeGroup)}
            onDelete={deleteFilter}
          />
        )}
        <Separator />

        <FiltersGroup label={"Environnement"}>
          <SelectInput<WaterNeed>
            label="Besoin en eau"
            options={options.waterNeed}
            selectValue={formFilters.waterNeed?.value || ""}
            onValueChange={(data) => handleFilters({ waterNeed: data })}
          />
          <SelectInput<SunExposure>
            label="Exposition"
            options={options.sunExposure}
            selectValue={formFilters.sunExposure?.value || ""}
            onValueChange={(data) => handleFilters({ sunExposure: data })}
          />
          <NumberInput
            label="Rusticité"
            unit="°C"
            value={formFilters.coldHardiness?.value || 0}
            minRange={options.coldHardiness.value.min}
            maxRange={options.coldHardiness.value.max}
            onValueChange={(data) => handleFilters({ coldHardiness: data })}
          />
        </FiltersGroup>
        {(formFilters.waterNeed ||
          formFilters.sunExposure ||
          formFilters.coldHardiness) && (
          <FiltersBadgeGroup
            badges={generateBadges(environmentBadgeGroup)}
            onDelete={deleteFilter}
          />
        )}
        <Separator />
      </SidebarContent>
      <SidebarFooter className="py-4">
        <SidebarMenuButton
          size="lg"
          onClick={() => handleFilteredRequest(formFilters)}
          asChild
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-foreground text-sidebar-primary-foreground hover:cursor-pointer">
            chercher
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SearchForm;

"use client";

import { Separator } from "@/app/components/shadcn-ui/separator";
import { useEffect, useState } from "react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarInput,
  Sidebar,
} from "@/app/components/shadcn-ui/sidebar";
import { EncyclopediaDataType } from "@/types/encyclopedia";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/shadcn-ui/button";
import { normalizeString } from "@/lib/utils/string";
import { KeyValueType } from "@/types/data";
import { sortInsensitivelyKeyValueArray } from "@/lib/utils/key-value";

interface SidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: EncyclopediaDataType;
}

const navigationData = [
  { label: "Plante", datasetType: "plants" as keyof EncyclopediaDataType },
  { label: "Famille", datasetType: "families" as keyof EncyclopediaDataType },
  { label: "Genre", datasetType: "genuses" as keyof EncyclopediaDataType },
];

const EncyclopediaSideBar = ({ data, ...props }: SidebarProps) => {
  const router = useRouter();

  const [filter, setFilter] = useState("");
  const [datasetType, setDatasetType] = useState<keyof EncyclopediaDataType>(
    navigationData[0].datasetType
  );

  useEffect(() => {
    setFilter("");
  }, [datasetType]);

  function filterData(
    data: EncyclopediaDataType,
    filter: string,
    type: keyof EncyclopediaDataType
  ) {
    const sortedData = sortInsensitivelyKeyValueArray(data[type]);

    return sortedData.filter((data: KeyValueType<string>) => {
      return normalizeString(data.value)
        .toLowerCase()
        .startsWith(normalizeString(filter).toLowerCase());
    });
  }

  return (
    <Sidebar variant="inset" className=" " {...props}>
      <SidebarHeader className="p-4">
        <div className="grid grid-cols-[1fr_1fr_1fr] [&>button]:rounded-none [&>button:first-child]:rounded-l-full [&>button:last-child]:rounded-r-full">
          {navigationData.map((d) => (
            <Button
              key={d.label}
              variant={d.datasetType === datasetType ? "default" : "secondary"}
              onClick={() => setDatasetType(d.datasetType)}
            >
              {d.label}
            </Button>
          ))}
        </div>
        <SidebarInput
          id="name"
          type="text"
          placeholder="recherche"
          value={filter}
          className="w-full my-4"
          onChange={(e) => setFilter(e.target.value)}
        />
      </SidebarHeader>
      <Separator className="w-5/6 m-auto" />
      <SidebarContent className="p-4">
        <SidebarMenu>
          {filterData(data, filter, datasetType).map((d) => (
            <SidebarMenuItem key={d.value} className="p-1">
              <SidebarMenuButton
                onClick={() =>
                  router.push(`/encyclopedia/${datasetType}/${d.key}`)
                }
              >
                {d.value}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default EncyclopediaSideBar;

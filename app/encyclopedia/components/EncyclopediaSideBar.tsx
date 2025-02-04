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
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/shadcn-ui/button";
import { normalizeString } from "@/app/lib/utils/string";
import { KeyValueType } from "@/types/base";
import { sortInsensitivelyKeyValueStringArray } from "@/app/lib/utils/key-value";

type SideBarDataType = Record<string, Array<KeyValueType<string>>>;

interface SidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: Record<string, Array<KeyValueType<string>>>;
}

const navigationData = [
  { label: "Plante", datasetType: "plants" },
  { label: "Famille", datasetType: "families" },
  { label: "Genre", datasetType: "genuses" },
];

const EncyclopediaSideBar = ({ data, ...props }: SidebarProps) => {
  const router = useRouter();

  const [filter, setFilter] = useState("");
  const [datasetType, setDatasetType] = useState<keyof typeof data>(
    navigationData[0].datasetType
  );

  useEffect(() => {
    setFilter("");
  }, [datasetType]);

  function filterData(
    data: SideBarDataType,
    filter: string,
    type: keyof typeof data
  ) {
    const sortedData = sortInsensitivelyKeyValueStringArray(data[type]);

    return sortedData.filter((data: KeyValueType<string>) => {
      return normalizeString(data.key)
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
          {data &&
            filterData(data, filter, datasetType).map((d) => (
              <SidebarMenuItem key={d.value} className="p-1">
                <SidebarMenuButton
                  onClick={() =>
                    router.push(`/encyclopedia/${datasetType}/${d.value}`)
                  }
                >
                  {d.key}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default EncyclopediaSideBar;

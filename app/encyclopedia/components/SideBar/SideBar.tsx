"use client";

import useSWR, { SWRConfig } from "swr";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { normalizeString } from "@/lib/utils";
import { useState } from "react";
import { fetcher } from "@/lib/fetcher";
import AlphabeticalListIndex from "@/app/components/AlphabeticalList/AlphabeticalListIndex";
import AlphabeticalListItems from "@/app/components/AlphabeticalList/AlphabeticalListItems";
import Loader from "@/app/components/Loader";
import { useRouter } from "next/navigation";
import { ListedType } from "@/types/ListedType";

const navigationData = [
  {
    label: "Plante",
    url: "/plants",
  },
  {
    label: "Famille",
    url: "/families",
  },
  {
    label: "Genre",
    url: "/genuses",
  },
];

const SideBar = () => {
  const router = useRouter();

  const [filter, setFilter] = useState("");
  const [indexLetter, setIndexLetter] = useState("");
  const [inputFilterValue, setInputFilterValue] = useState("");
  const [apiUrl, setApiUrl] = useState(navigationData[0].url);

  const { data, error, isLoading } = useSWR(`/api${apiUrl}/listed`, fetcher);

  function filterData(data: ListedType[], filter: string) {
    return data.filter((d: ListedType) =>
      normalizeString(d.label)
        .toLowerCase()
        .startsWith(normalizeString(filter).toLowerCase())
    );
  }

  function resetFilters() {
    setFilter("");
    setInputFilterValue("");
    setIndexLetter("");
  }

  function handleInputFilterChange(value: string) {
    setIndexLetter("");
    setInputFilterValue(value);
    setFilter(value);
  }

  function handleIndexLetterSelection(value: string) {
    setInputFilterValue("");
    setIndexLetter(value);
    setFilter(value);
  }

  function handleItemSelection(id: string) {
    router.push(`/encyclopedia${apiUrl}/${id}`);
  }

  if (error) return <p>error !</p>;

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        dedupingInterval: 24 * 60 * 60 * 1000,
      }}
    >
      <div className="flex flex-col gap-4 flex-1 overflow-hidden p-4">
        <div className="flex [&>button]:flex-1 [&>button]:rounded-none [&>button:first-child]:rounded-l-full [&>button:last-child]:rounded-r-full">
          {navigationData.map((d) => (
            <Button
              key={d.label}
              variant={d.url === apiUrl ? "default" : "secondary"}
              onClick={() => {
                if (navigationData.some((nD) => nD.url === d.url)) {
                  setApiUrl(d.url);
                  resetFilters();
                }
              }}
            >
              {d.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center my-2">
          <Input
            id="name"
            type="text"
            placeholder="recherche"
            value={inputFilterValue}
            className="w-full"
            onChange={(e) => handleInputFilterChange(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <Separator />
        </div>
        <div className="flex h-full max-h-full gap-6 overflow-hidden">
          <AlphabeticalListIndex
            activeIndex={indexLetter}
            handleIndexLetterSelection={(l) => handleIndexLetterSelection(l)}
            className="grid grid-cols-26  p-2 justify-center border-r border-zinc-200 [&>li:last-child]:border-none"
          />
          {!isLoading ? (
            <AlphabeticalListItems
              onClick={(id: string) => handleItemSelection(id)}
              list={filterData(data, filter)}
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </SWRConfig>
  );
};

export default SideBar;

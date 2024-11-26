"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import AlphabeticalNavigation from "@/app/components/AlphabeticalNavigation/AlphabeticalNavigation";
import Loader from "@/app/components/Loader";
import { useRouter } from "next/navigation";

const FamilyList = () => {
  const router = useRouter();

  const { data, error, isLoading } = useSWR("/api/families", fetcher);

  function handleSelectItem(id: string) {
    router.push(`/encyclopedia/families/${id}`);
  }

  function handleFilter(filter: string) {
    console.log("ID: ", filter);
  }

  if (error) return <p>error !</p>;

  return isLoading ? (
    <Loader />
  ) : (
    <AlphabeticalNavigation
      list={data}
      onItemClick={handleSelectItem}
      onFilterChange={handleFilter}
    />
  );
};

export default FamilyList;

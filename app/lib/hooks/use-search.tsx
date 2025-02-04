import { KeyValueType } from "@/types/base";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../fetcher";
import { RequestFilterType } from "@/types/search";

const useSearch = <T extends { [K in keyof T]: KeyValueType<string> }>() => {
  const emptyFilters = {} as RequestFilterType<T>;

  const [filters, setFilters] = useState<RequestFilterType<T>>(emptyFilters);
  const [request, setRequest] = useState<string | null>(null);

  const { data: results } = useSWR(request, fetcher);

  function updateFilters(filter: RequestFilterType<T>) {
    setFilters((prev) => ({ ...prev, ...filter }));
  }

  function deleteFilter(key: keyof T) {
    const tempFilters = { ...filters };

    if (!tempFilters[key]) return;

    delete tempFilters[key];

    setFilters({ ...tempFilters });
  }

  function resetFilters() {
    setFilters(emptyFilters);
  }

  function doRequest() {
    const searchParams = new URLSearchParams(filters);
    setRequest(`/api/plants/filtred?${searchParams}`);
  }

  return {
    filters,
    updateFilters,
    deleteFilter,
    resetFilters,
    doRequest,
    results,
  };
};

export default useSearch;

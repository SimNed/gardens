import { KeyValueType } from "@/types/base";
import { Reducer, useReducer } from "react";
import useSWR from "swr";
import { RequestFilterType } from "@/types/search";
import searchReducer, { SearchActions, SearchState } from "./reducer";
import { fetcher } from "../../fetcher";

const useSearch = <T extends { [K in keyof T]: KeyValueType<string> }>() => {
  const initialState: SearchState<T> = {
    filters: {} as RequestFilterType<T>,
    request: null,
  };

  const [state, dispatch] = useReducer<
    Reducer<SearchState<T>, SearchActions<T>>
  >(searchReducer, initialState);

  const { data: results } = useSWR(state.request, fetcher);

  return {
    state,
    results,
    updateFilters: (filter: RequestFilterType<T>) =>
      dispatch({ type: "update_filters", filter }),
    deleteFilter: (key: keyof T) => dispatch({ type: "delete_filter", key }),
    resetFilters: () => dispatch({ type: "reset_filters" }),
    doRequest: () => dispatch({ type: "do_request" }),
  };
};

export default useSearch;

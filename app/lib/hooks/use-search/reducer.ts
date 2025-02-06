import { RequestFilterType } from "@/types/search";

export interface SearchState<T> {
  filters: RequestFilterType<T>;
  request: string | null;
}

export type SearchActions<T> =
  | { type: "update_filters"; filter: RequestFilterType<T> }
  | { type: "reset_filters" }
  | { type: "delete_filter"; key: keyof T }
  | { type: "do_request" };

export default function searchReducer<T>(
  state: SearchState<T>,
  action: SearchActions<T>
) {
  switch (action.type) {
    case "update_filters": {
      return {
        ...state,
        filters: { ...state.filters, ...action.filter },
      };
    }
    case "reset_filters": {
      return {
        ...state,
        filters: {} as RequestFilterType<T>,
      };
    }
    case "delete_filter": {
      const tempFilters = { ...state.filters };

      delete tempFilters[action.key];
      return { ...state, filters: { ...tempFilters } };
    }
    case "do_request": {
      const searchParams = new URLSearchParams(state.filters);
      return { ...state, request: `/api/plants/filtred?${searchParams}` };
    }
    default: {
      throw Error("Unknown action");
    }
  }
}

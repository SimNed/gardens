import { getSearchFormOptions } from "../actions/search";
import SearchSidebar from "./components/SearchSidebar";

export default async function SearchPage() {
  const formOptions = await getSearchFormOptions();

  return <SearchSidebar formOptions={formOptions} />;
}

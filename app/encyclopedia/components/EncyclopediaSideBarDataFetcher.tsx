import { getFamilies } from "@/lib/api/family";
import EncyclopediaSideBar from "./EncyclopediaSideBar";
import { getPlants } from "@/lib/api/plants";
import { getGenuses } from "@/lib/api/genuses";

export default async function EncyclopediaSideBarDataFetcher() {
  const plants = await getPlants();
  const families = await getFamilies();
  const genuses = await getGenuses();

  return <EncyclopediaSideBar data={{ plants, families, genuses }} />;
}

import Loader from "@/app/components/Loader";
import PlantArticle from "./components/PlantArticle";
import { getPlantDetailed } from "@/app/actions/plants";

export default async function PlantPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const plant = await getPlantDetailed(params.id);

  return plant ? <PlantArticle plant={plant} /> : <Loader />;
}

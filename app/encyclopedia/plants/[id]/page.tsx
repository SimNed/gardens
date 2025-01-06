import PlantArticle from "./components/PlantArticle";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPlant } from "@/lib/api/plants";
import { PlantArticleSkeleton } from "./components/PlantArticleSkeleton";
import { unstable_noStore } from "next/cache";

export default async function PlantPage(props: {
  params: Promise<{ id: string }>;
}) {
  unstable_noStore();

  const params = await props.params;
  const plant = await getPlant(params.id);

  if (!plant) notFound();

  return (
    <Suspense fallback={<PlantArticleSkeleton />}>
      <PlantArticle plant={plant} />
    </Suspense>
    // <PlantArticleSkeleton />
  );
}

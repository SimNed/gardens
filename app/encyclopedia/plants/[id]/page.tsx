import PlantArticle from "./components/PlantArticle";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PlantArticleSkeleton } from "./components/PlantArticleSkeleton";
import { unstable_noStore } from "next/cache";
import { PlantType } from "@/types/plant";

export default async function PlantPage(props: {
  params: Promise<{ id: string }>;
}) {
  unstable_noStore();

  const params = await props.params;

  const plant: PlantType = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/plants/${params.id}`
  ).then((response) => response.json());

  if (!plant) notFound();

  return (
    <Suspense fallback={<PlantArticleSkeleton />}>
      <PlantArticle plant={plant} />
    </Suspense>
  );
}

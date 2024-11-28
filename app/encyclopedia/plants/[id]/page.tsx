"use client";

import { fetcher } from "@/lib/fetcher";
import { useParams } from "next/navigation";
import useSWR from "swr";
import PlantArticleHeader from "./components/PlantArticle/PlantArticleHeader";
import Loader from "@/app/components/Loader";

export default function PlantPage() {
  const params = useParams();

  const { data, error, isLoading } = useSWR(
    `/api/plants/${params.id}`,
    fetcher
  );

  if (error) return <div>Erreur de chargement</div>;

  return !isLoading ? <PlantArticleHeader plant={data} /> : <Loader />;
}

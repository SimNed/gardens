"use client";

import { fetcher } from "@/lib/fetcher";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function GenusPage() {
  const params = useParams();
  const { data, error, isLoading } = useSWR(
    `/api/genuses/${params.id}`,
    fetcher
  );

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur de chargement</div>;

  return (
    <div>
      <h1>{data.label}</h1>
    </div>
  );
}

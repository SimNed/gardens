import QuizzDisplayer from "../components/QuizzDisplayer";
import { PlantWithTaxonomyQuizzType } from "@/types/quizz";
import { getTaxonomyQuizz } from "@/lib/api/quizz";
import { notFound } from "next/navigation";

export default async function QuizzTaxonomyByNamePage() {
  const plants: PlantWithTaxonomyQuizzType[] = await getTaxonomyQuizz();

  if (!plants) notFound();

  return (
    <>
      <h1 className="text-5xl font-semibold py-8">Taxonomie par nom</h1>
      <QuizzDisplayer
        items={plants.map((plant) => {
          return {
            element: plant.commonName,
            questions: [
              { label: "famille", solution: plant.familyLabel },
              { label: "genre", solution: plant.genusLabel },
              { label: "espèce", solution: plant.species },
            ],
          };
        })}
        timerDuration={30}
      />
    </>
  );
}

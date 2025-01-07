import Section from "@/app/components/Section";
import QuizzDisplayer from "../components/QuizzDisplayer";
import { PlantWithTaxonomyQuizzType } from "@/types/quizz";
import { getTaxonomyQuizz } from "@/lib/api/quizz";
import { notFound } from "next/navigation";

export default async function QuizzTaxonomyByNamePage() {
  const plants: PlantWithTaxonomyQuizzType[] = await getTaxonomyQuizz();

  console.log(plants);

  if (!plants) notFound();

  return (
    <Section className="flex flex-col gap-8 items-center">
      <h1 className="text-5xl font-semibold py-8">Taxonomie par nom</h1>
      <QuizzDisplayer
        items={plants.map((plant) => {
          return {
            element: plant.commonName,
            questions: [
              { label: "famille", solution: plant.familyLabel },
              { label: "nom vernaculaire", solution: plant.taxonomicName },
            ],
          };
        })}
        timerDuration={30}
      />
    </Section>
  );
}

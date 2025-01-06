import Section from "@/app/components/Section";
import QuizzDisplayer from "../components/QuizzDisplayer";
import { PlantWithTaxonomyQuizzType } from "@/types/quizz";
import { getTaxonomyQuizz } from "@/lib/api/quizz";

export default async function QuizzTaxonomyByNamePage() {
  const data: PlantWithTaxonomyQuizzType[] = await getTaxonomyQuizz();

  return (
    <Section className="flex flex-col gap-8 items-center">
      <h1 className="text-5xl font-semibold py-8">Taxonomie par nom</h1>
      {data.length > 0 && (
        <QuizzDisplayer
          data={data.map((plant) => {
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
      )}
    </Section>
  );
}

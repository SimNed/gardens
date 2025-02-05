import Section from "@/app/components/ui/Section";
import { PlantWithTaxonomyQuizzType } from "@/types/quizz";
import Quizz from "../components/Quizz";
import { getPlantTaxonomyQuestionnaire } from "@/app/lib/utils/quizz";

export default async function QuizzTaxonomyByNamePage() {
  const plants: Array<PlantWithTaxonomyQuizzType> = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/plants/quizz/taxonomy`
  ).then((response) => response.json());

  return (
    <Section className="flex items-center">
      {plants.length > 0 && (
        <Quizz
          variant="text"
          duration={20}
          questionnaire={getPlantTaxonomyQuestionnaire(plants)}
        />
      )}
    </Section>
  );
}

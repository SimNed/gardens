import Section from "@/app/components/ui/Section";
import { PlantWithTaxonomyQuizzType } from "@/types/quizz";
import Quizz from "../components/Quizz";
import { getPlantIdentificationQuestionnaire } from "@/app/lib/utils/quizz";
import { QuizzProvider } from "../../lib/contexts/quizz-context";

export default async function QuizzIdentificationByPicturePage() {
  const plants: Array<PlantWithTaxonomyQuizzType> = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/plants/quizz/identification`
  ).then((response) => response.json());

  return (
    <QuizzProvider
      initialQuestionnaire={getPlantIdentificationQuestionnaire(plants)}
    >
      <Section className="flex items-center">
        {plants.length > 0 && <Quizz variant="image" />}
      </Section>
    </QuizzProvider>
  );
}

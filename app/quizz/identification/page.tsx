import Section from "@/app/components/Section";
import { PlantQuizzType } from "@/types/quizz";
import QuizzWithPictureDisplayer from "../components/QuizzWithPictureDisplayer";
import { getIdentificationQuizz } from "@/lib/api/quizz";

export default async function QuizzIdentificationByPicturePage() {
  const data: PlantQuizzType[] = await getIdentificationQuizz();

  return (
    <Section className="flex items-center">
      {data.length > 0 && (
        <QuizzWithPictureDisplayer
          data={data.map((d) => {
            return {
              element: d.imageUrl,
              questions: [{ label: "nom commun", solution: d.commonName }],
            };
          })}
        />
      )}
    </Section>
  );
}

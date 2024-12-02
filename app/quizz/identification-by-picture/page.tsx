import Section from "@/app/components/Section";
import { PlantQuizzType } from "@/types/QuizzType";
import QuizzWithPictureDisplayer from "../components/QuizzWithPictureDisplayer";

export default async function PictureIdentificationPage() {
  const data: PlantQuizzType[] = await fetch(
    "http://localhost:3000/api/quizzes/identification-by-picture"
  ).then((response) => response.json());

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

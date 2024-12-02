import Section from "@/app/components/Section";
import { PlantQuizzType } from "@/types/QuizzType";
import QuizzWithPictureDisplayer from "../components/QuizzWithPictureDisplayer";

export default async function PictureIdentificationPage() {
  const data: PlantQuizzType[] = await fetch(
    "http://localhost:3000/api/quizzes/taxonomy-by-picture"
  ).then((response) => response.json());

  return (
    <Section className="flex flex-col gap-8 items-center">
      <h1 className="text-5xl font-semibold py-8">Taxonomie par image</h1>
      <p>retrouver</p>
      {data.length > 0 && (
        <QuizzWithPictureDisplayer
          data={data.map((d) => {
            return {
              element: d.imageUrl,
              questions: [
                { label: "famille", solution: d.familyLabel },
                { label: "genre", solution: d.genusLabel },
                { label: "nom vernaculaire", solution: d.taxonomicName },
              ],
            };
          })}
          timerDuration={30}
        />
      )}
    </Section>
  );
}

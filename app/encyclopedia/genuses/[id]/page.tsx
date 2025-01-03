import Section from "@/app/components/Section";
import EncyclopediaArticleBreadCrumb from "../../components/EncyclopediaArticleBreadCrumb";
import Link from "next/link";
import { getGenusDetailed } from "@/app/actions/genuses";
import { notFound } from "next/navigation";

export default async function GenusPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const genus = await getGenusDetailed(params.id);

  if (!genus) {
    notFound();
  }

  const prevSteps = [
    {
      label: genus.family.label,
      url: `/encyclopedia/families/${genus.family.id}`,
    },
  ];

  return (
    <>
      <EncyclopediaArticleBreadCrumb
        prevSteps={prevSteps}
        currentStepLabel={genus.label}
      />
      <Section className="" variant="lg">
        <h1 className="text-5xl font-semibold mb-2">{genus.label}</h1>
        <p>{genus.description}</p>
        <ul>
          {genus.plants.map((plant) => (
            <li key={plant.id}>
              <Link
                href={`/encyclopedia/plants/${plant.id}`}
                className="underline"
              >
                {plant.commonName}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

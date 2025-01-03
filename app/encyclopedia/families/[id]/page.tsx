import Link from "next/link";
import EncyclopediaArticleBreadCrumb from "../../components/EncyclopediaArticleBreadCrumb";
import Section from "@/app/components/Section";
import { notFound } from "next/navigation";
import { getFamilyDetailed } from "@/app/actions/families";

export default async function FamilyPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const family = await getFamilyDetailed(params.id);

  if (!family) {
    notFound();
  }

  return (
    <>
      <EncyclopediaArticleBreadCrumb currentStepLabel={family.label} />
      <Section className="" variant="lg">
        <h1 className="text-5xl font-semibold mb-2">{family.label}</h1>
        <p>{family.description}</p>
        <ul>
          {family.genuses.map((genus) => (
            <li key={genus.id}>
              <Link
                href={`/encyclopedia/genuses/${genus.id}`}
                className="underline"
              >
                {genus.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

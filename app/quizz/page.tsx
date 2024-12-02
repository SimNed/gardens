import Section from "../components/Section";
import { Binoculars, BookOpenText, Sprout } from "lucide-react";
import QuizzNavigationCard from "./components/QuizzNavigationCard";

const navigationData = [
  {
    label: "Identification par image",
    url: "/identification-by-picture",
    description: "Identifier une plante à partir de sa photo",
    icon: <Binoculars />,
  },
  {
    label: "Taxonomie par image",
    url: "/taxonomy-by-picture",
    description: "Identifier une plante à partir de son nom vernaculaire",
    icon: <BookOpenText />,
  },
  {
    label: "Culture générale",
    url: "/taxonomy-guess",
    description: "Renseigner la taxonomie de différentes plantes",
    icon: <Sprout />,
  },
];

export default async function QuizzPage() {
  return (
    <Section className="flex items-center">
      <div className="my-24 grid grid-cols-3 gap-6 [&>*]:aspect-square h-fit">
        {navigationData.map((d) => (
          <QuizzNavigationCard
            key={d.label}
            label={d.label}
            url={d.url}
            description={d.description}
            icon={d.icon}
          />
        ))}
      </div>
    </Section>
  );
}

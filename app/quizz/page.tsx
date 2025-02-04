import Section from "../components/ui/Section";
import { Binoculars, BookOpenText } from "lucide-react";
import QuizzNavigationCard from "./components/QuizzNavigationCard";

const navigationData = [
  {
    label: "Identification",
    icon: <Binoculars />,
    description: "Identifier une plante à partir de sa photo",
    data: [
      {
        label: "Identification par plante",
        url: "/identification",
      },
    ],
  },
  {
    label: "Taxonomie",
    icon: <BookOpenText />,
    description: "Trouver la taxonomie d'une plante",
    data: [
      {
        label: "Taxonomie par nom commun",
        url: "/taxonomy",
      },
    ],
  },
];

export default async function QuizzPage() {
  return (
    <Section variant="lg" className="flex items-center">
      <div className="grid grid-cols-2 gap-10 w-full">
        {navigationData.map((data) => (
          <QuizzNavigationCard
            key={data.label}
            label={data.label}
            icon={data.icon}
            description={data.description}
            data={data.data}
          />
        ))}
      </div>
    </Section>
  );
}

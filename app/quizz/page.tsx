import Section from "../components/ui/Section";
import { Binoculars, BookOpenText } from "lucide-react";
import QuizzMenu from "./components/QuizzMenu";

const menus = [
  {
    label: "Identification",
    icon: <Binoculars />,
    description: "Identifier une plante à partir de sa photo",
    elements: [
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
    elements: [
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
        {menus.map((menu) => (
          <QuizzMenu
            key={menu.label}
            label={menu.label}
            icon={menu.icon}
            description={menu.description}
            elements={menu.elements}
          />
        ))}
      </div>
    </Section>
  );
}

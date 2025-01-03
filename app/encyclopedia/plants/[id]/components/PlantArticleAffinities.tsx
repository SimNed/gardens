import { PlantDetailedType } from "@/types/plant";
import { Bug, Stethoscope } from "lucide-react";
import Link from "next/link";

interface PlantArticleAffinitiesProps {
  plant: PlantDetailedType;
}

const PlantArticleAffinities = ({ plant }: PlantArticleAffinitiesProps) => {
  return (
    <div className="flex flex-col gap-4 [&>div]:flex-1 my-4">
      <div>
        <div className="flex items-center gap-2 p-2 bg-zinc-100">
          <Bug size={16} />
          <h2 className="font-normal">Parasites</h2>
        </div>
        <ul className="p-2 my-2">
          {plant.pests.map((pest) => (
            <li key={pest.id}>
              {
                <Link
                  className="underline text-sm"
                  href={`/encyclopedia/pests/${pest.id}`}
                >
                  {pest.label}
                </Link>
              }
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="flex items-center gap-2 p-2 bg-zinc-100">
          <Stethoscope size={16} />
          <h2 className="font-normal">Maladies</h2>
        </div>
        <ul className="p-2 my-2">
          {plant.diseases.map((disease) => (
            <li key={disease.id}>
              {
                <Link
                  className="underline text-sm"
                  href={`/encyclopedia/diseases/${disease.id}`}
                >
                  {disease.label}
                </Link>
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlantArticleAffinities;

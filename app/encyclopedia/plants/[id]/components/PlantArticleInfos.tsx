import { getLifeCycleLabel, getSoilLabel } from "@/app/lib/utils/plant";
import { capitalizeFirstLetter } from "@/app/lib/utils/string";
import { PlantWithTaxonomyType } from "@/types/plant";

interface PlantArticleInfosProps {
  plant: PlantWithTaxonomyType;
}

const PlantArticleInfos = ({ plant }: PlantArticleInfosProps) => {
  const plantInfos = [
    {
      key: "Famille",
      value: plant.genus.family.label,
    },
    {
      key: "Genre",
      value: plant.genus.label,
    },
    {
      key: "Cycle",
      value: getLifeCycleLabel(plant.lifeCycle),
    },
    {
      key: "Origine",
      value: plant.origin,
    },
    {
      key: "Cycle de culture",
      value: plant.cultureLifeCycle
        ? getLifeCycleLabel(plant.cultureLifeCycle)
        : getLifeCycleLabel(plant.lifeCycle),
    },
    {
      key: "Sols",
      value: capitalizeFirstLetter(
        plant.soils.map((soil) => getSoilLabel(soil)).join(", ")
      ),
    },
  ];

  return (
    <ul className="my-4">
      {plantInfos.map((plantInfo) => (
        <li
          key={plantInfo.key}
          className="grid grid-cols-[2fr_5fr] text-sm [&>div]:p-2 [&:nth-child(odd)]:bg-zinc-100"
        >
          <div className="border-r p-2">{plantInfo.key}</div>
          <div>{plantInfo.value}</div>
        </li>
      ))}
    </ul>
  );
};

export default PlantArticleInfos;

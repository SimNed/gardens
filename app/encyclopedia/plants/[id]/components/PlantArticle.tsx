"use server";

import EncyclopediaArticleBreadCrumb from "@/app/encyclopedia/components/EncyclopediaArticleBreadCrumb";
import PlantArticleHeader from "./PlantArticleHeader";
import Section from "@/app/components/Section";
import { PlantDetailedType } from "@/types/plant";
import PlantArticleInfos from "./PlantArticleInfos";
import PlantArticleAffinities from "./PlantArticleAffinities";

interface PlantArticleProps {
  plant: PlantDetailedType;
}

const PlantArticle = ({ plant }: PlantArticleProps) => {
  const prevSteps = [
    {
      label: plant.genus.family.label,
      url: `/encyclopedia/families/${plant.genus.family.id}`,
    },
    {
      label: plant.genus.label,
      url: `/encyclopedia/genuses/${plant.genus.id}`,
    },
  ];

  return (
    <>
      <EncyclopediaArticleBreadCrumb
        prevSteps={prevSteps}
        currentStepLabel={plant.taxonomicName}
      />
      <Section variant="lg">
        <PlantArticleHeader plant={plant} />
        <div className="grid grid-cols-[3fr_2fr] gap-24">
          <PlantArticleInfos plant={plant} />
          <PlantArticleAffinities plant={plant} />
        </div>
        <p className="text-justify">{plant.description}</p>
      </Section>
    </>
  );
};

export default PlantArticle;

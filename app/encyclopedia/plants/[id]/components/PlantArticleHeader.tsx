"use server";

import Rank from "@/app/components/Rank";

import { Separator } from "@/app/components/shadcn-ui/separator";

import { Sun, Droplet, Snowflake, Flower } from "lucide-react";
import Image from "next/image";
import MonthsBar from "./MonthsBar";
import {
  getMelliferousRank,
  getSunExposureRank,
  getWaterNeedRank,
} from "@/lib/utils/plant";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { getMonthIndex } from "@/lib/utils/month";
import { PlantType } from "@/types/plant";

interface PlantArticleHeaderProps {
  plant: PlantType;
}

const PlantArticleHeader = ({ plant }: PlantArticleHeaderProps) => {
  return (
    <div className="grid grid-cols-[3fr_2fr] gap-24">
      <div>
        <div>
          <h1 className="text-5xl font-semibold mb-0 pb-0">
            {plant.commonName}
          </h1>
          <p className="text-xl font-noto-serif italic">
            {`${plant.genus.label} ${plant.species}`}
          </p>
        </div>
        <div className="border-y py-2 grid grid-cols-4 justify-center">
          <Rank length={getSunExposureRank(plant.sunExposure)}>
            <Sun size={16} />
          </Rank>
          <Rank length={getWaterNeedRank(plant.waterNeed)}>
            <Droplet size={16} />
          </Rank>
          <Rank length={getMelliferousRank(plant.melliferous)}>
            <Flower size={16} />
          </Rank>
          <div className="flex justify-center items-center gap-1">
            <p className="p-0">{`${plant.coldHardiness}°C`}</p>
            <Snowflake size={16} />
          </div>
        </div>
        <div className="py-4">
          <MonthsBar
            variant="culture"
            months={plant.cultureMonths.map((month) => getMonthIndex(month))}
          />
          <Separator className="my-2" />
          <MonthsBar
            variant="harvest"
            months={plant.harvestMonths.map((month) => getMonthIndex(month))}
          />
        </div>
      </div>
      <div>
        <div className="w-full">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={plant.imageUrl}
              alt={`illustration de ${plant.commonName}`}
              fill
              priority
              className="object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};

export default PlantArticleHeader;

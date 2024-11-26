import MonthsBar from "@/app/components/MonthsBar";
import Rank from "@/app/components/Rank";
import { Separator } from "@/components/ui/separator";
import {
  getLifeCycleClientDTO,
  getMelliferousClientDTO,
  getMonthClientDTO,
  getSunExposureClientDTO,
  getWaterNeedClientDTO,
} from "@/lib/prisma/enumDTOMapper";
import { Plant } from "@prisma/client";
import { Sun, Droplet, Snowflake, Flower } from "lucide-react";
import Image from "next/image";

interface PlantArticleHeaderProps {
  plant: Plant & {
    genus: {
      label: string;
      family: {
        label: string;
      };
    };
  };
}

function PlantArticleHeader({ plant }: PlantArticleHeaderProps) {
  return (
    <div className="grid grid-cols-[3fr_2fr] gap-16 py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-5xl font-semibold mb-2">{plant.commonName}</h1>
          <h2 className="text-xl font-noto-serif italic">
            {plant.taxonomicName}
          </h2>
        </div>

        <Separator />

        <h3 className="text-xl font-noto-serif">
          {plant.genus.family.label}{" "}
          <span className="italic">{plant.genus.label}</span>
        </h3>

        <div className="grid grid-cols-4 [&>*]:col-span-1 [&>*]:gap-3 [&>*]:border-r [&>*]:border-gray-300 [&>*:last-child]:border-none">
          <Rank length={getSunExposureClientDTO(plant.sunExposure).index}>
            <Sun />
          </Rank>
          <Rank length={getWaterNeedClientDTO(plant.waterNeed).index}>
            <Droplet />
          </Rank>
          <Rank length={getMelliferousClientDTO(plant.melliferous).index}>
            <Flower />
          </Rank>
          <div className="flex justify-center">
            <p className="">{plant.coldHardiness}</p>
            <Snowflake />
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <p>cycle: {getLifeCycleClientDTO(plant.lifeCycle).label}</p>
          <p>origine: {plant.origin}</p>
        </div>

        <div>
          <MonthsBar
            variant="culture"
            months={plant.cultureMonths.map((m) => getMonthClientDTO(m).index)}
          />
          <Separator className="my-2" />
          <MonthsBar
            variant="harvest"
            months={plant.harvestMonths.map((m) => getMonthClientDTO(m).index)}
          />
        </div>
      </div>

      <Image
        src={plant.imageUrl}
        width={400}
        height={200}
        alt={`illustration de ${plant.commonName}`}
      />
    </div>
  );
}

export default PlantArticleHeader;

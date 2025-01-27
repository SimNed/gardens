import { WaterNeed } from "@prisma/client";
import SelectInput from "../inputs/SelectInput";
import { KeyValueType } from "@/types/data";
import { getWaterNeeds } from "@/lib/api/options/water-need";

interface WaterNeedFilterProps {
  value: string;
  onValueChange: (data: KeyValueType<WaterNeed>) => void;
}

export default function WaterNeedSelect({
  value,
  onValueChange,
}: WaterNeedFilterProps) {
  const options = getWaterNeeds();

  return (
    <SelectInput<WaterNeed>
      label="Besoin en eau"
      options={options}
      selectValue={value}
      onValueChange={onValueChange}
    />
  );
}

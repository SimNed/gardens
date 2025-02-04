import { WaterNeed } from "@prisma/client";
import SelectInput from "../inputs/SelectInput";
import { getListedWaterNeeds } from "@/app/services/water-need";

interface WaterNeedFilterProps {
  value: string;
  onValueChange: (data: string) => void;
}

export default function WaterNeedSelect({
  value,
  onValueChange,
}: WaterNeedFilterProps) {
  const options = getListedWaterNeeds();

  return (
    <SelectInput<WaterNeed>
      label="Besoin en eau"
      options={options}
      selectValue={value}
      onValueChange={(option) => onValueChange(option.value)}
    />
  );
}

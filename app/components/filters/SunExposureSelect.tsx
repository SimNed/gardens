import { SunExposure } from "@prisma/client";
import SelectInput from "../inputs/SelectInput";
import { KeyValueType } from "@/types/data";
import { getSunExposures } from "@/lib/api/options/sun-exposure";

interface SunExposureFilterProps {
  value: string;
  onValueChange: (data: KeyValueType<SunExposure>) => void;
}

export default function SunExposureSelect({
  value,
  onValueChange,
}: SunExposureFilterProps) {
  const options = getSunExposures();

  return (
    <SelectInput<SunExposure>
      label="Exposition"
      options={options}
      selectValue={value}
      onValueChange={onValueChange}
    />
  );
}

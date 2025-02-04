import { SunExposure } from "@prisma/client";
import SelectInput from "../inputs/SelectInput";
import { getListedSunExposures } from "@/app/services/sun-exposure";

interface SunExposureFilterProps {
  value: string;
  onValueChange: (data: string) => void;
}

export default function SunExposureSelect({
  value,
  onValueChange,
}: SunExposureFilterProps) {
  const options = getListedSunExposures();

  return (
    <SelectInput<SunExposure>
      label="Exposition"
      options={options}
      selectValue={value}
      onValueChange={(option) => onValueChange(option.value)}
    />
  );
}

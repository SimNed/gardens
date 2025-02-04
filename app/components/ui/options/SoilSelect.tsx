import { Soil } from "@prisma/client";
import SelectInput from "../inputs/SelectInput";
import { getListedSoils } from "@/app/services/soil";

interface SoilFilterProps {
  value: string;
  onValueChange: (data: string) => void;
}

export default function SoilSelect({ value, onValueChange }: SoilFilterProps) {
  const options = getListedSoils();

  return (
    <SelectInput<Soil>
      label="Sols"
      options={options}
      selectValue={value}
      onValueChange={(option) => onValueChange(option.value)}
    />
  );
}

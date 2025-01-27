import { Soil } from "@prisma/client";
import SelectInput from "../inputs/SelectInput";
import { KeyValueType } from "@/types/data";
import { getSoils } from "@/lib/api/options/soil";

interface SoilFilterProps {
  value: string;
  onValueChange: (data: KeyValueType<Soil>) => void;
}

export default function SoilSelect({ value, onValueChange }: SoilFilterProps) {
  const options = getSoils();

  return (
    <SelectInput<Soil>
      label="Sols"
      options={options}
      selectValue={value}
      onValueChange={onValueChange}
    />
  );
}

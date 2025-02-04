import { LifeCycle } from "@prisma/client";
import SelectInput from "../inputs/SelectInput";
import { getListedLifeCycles } from "@/app/services/life-cycle";

interface LifeCycleFilterProps {
  value: string;
  onValueChange: (data: string) => void;
}

export default function LifeCycleSelect({
  value,
  onValueChange,
}: LifeCycleFilterProps) {
  const options = getListedLifeCycles();

  return (
    <SelectInput<LifeCycle>
      label="Cycle de vie"
      options={options}
      selectValue={value}
      onValueChange={(option) => onValueChange(option.value)}
    />
  );
}

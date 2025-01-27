import { LifeCycle } from "@prisma/client";
import SelectInput from "../inputs/SelectInput";
import { KeyValueType } from "@/types/data";
import { getLifeCycles } from "@/lib/api/options/life-cycle";

interface LifeCycleFilterProps {
  value: string;
  onValueChange: (data: KeyValueType<LifeCycle>) => void;
}

export default function LifeCycleSelect({
  value,
  onValueChange,
}: LifeCycleFilterProps) {
  const options = getLifeCycles();

  return (
    <SelectInput<LifeCycle>
      label="Cycle de vie"
      options={options}
      selectValue={value}
      onValueChange={onValueChange}
    />
  );
}

import { Melliferous } from "@prisma/client";
import SelectInput from "../inputs/SelectInput";
import { KeyValueType } from "@/types/data";
import { getMelliferouses } from "@/lib/api/options/melliferous";

interface MelliferousFilterProps {
  value: string;
  onValueChange: (data: KeyValueType<Melliferous>) => void;
}

export default function MelliferousSelect({
  value,
  onValueChange,
}: MelliferousFilterProps) {
  const options = getMelliferouses();

  return (
    <SelectInput<Melliferous>
      label="Mélifère"
      options={options}
      selectValue={value}
      onValueChange={onValueChange}
    />
  );
}

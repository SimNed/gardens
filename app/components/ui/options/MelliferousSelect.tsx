import { Melliferous } from "@prisma/client";
import SelectInput from "../inputs/SelectInput";
import { getListedMelliferouses } from "@/app/services/melliferous";

interface MelliferousFilterProps {
  value: string;
  onValueChange: (data: string) => void;
}

export default function MelliferousSelect({
  value,
  onValueChange,
}: MelliferousFilterProps) {
  const options = getListedMelliferouses();

  return (
    <SelectInput<Melliferous>
      label="Mélifère"
      options={options}
      selectValue={value}
      onValueChange={(option) => onValueChange(option.value)}
    />
  );
}

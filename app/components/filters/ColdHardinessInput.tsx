import { KeyValueType } from "@/types/data";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import NumberInput from "../inputs/NumberInput";

interface ColdHardinessInputProps {
  value: number;
  onValueChange: (data: KeyValueType<number>) => void;
}

export default function ColdHardinessInput({
  value,
  onValueChange,
}: ColdHardinessInputProps) {
  const { data, error, isLoading } = useSWR(
    "/api/coldHardiness/range",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return (
    data && (
      <NumberInput
        label="Rusticité"
        unit="°C"
        value={value}
        minRange={data.min}
        maxRange={data.max}
        onValueChange={onValueChange}
      />
    )
  );
}

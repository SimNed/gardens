import { fetcher } from "@/app/lib/fetcher";
import useSWR from "swr";
import ComboBoxInput from "../inputs/ComboBoxInput";

interface PlantSelectProps {
  value: string;
  onValueChange: (data: string) => void;
}

export default function PlantSelect({
  value,
  onValueChange,
}: PlantSelectProps) {
  const { data, error, isLoading } = useSWR("/api/plants/list", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  return (
    data && (
      <ComboBoxInput<string>
        label={"Plante"}
        data={data}
        selectValue={value}
        onSelectChange={(option) => onValueChange(option.value)}
      />
    )
  );
}

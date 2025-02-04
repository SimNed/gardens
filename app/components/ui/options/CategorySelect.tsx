import { fetcher } from "@/app/lib/fetcher";
import useSWR from "swr";
import SelectInput from "../inputs/SelectInput";

interface CategorySelectProps {
  value: string;
  onValueChange: (data: string) => void;
}

export default function CategorySelect({
  value,
  onValueChange,
}: CategorySelectProps) {
  const { data, error, isLoading } = useSWR("/api/categories/list", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  return (
    data && (
      <SelectInput<string>
        label={"Catégories"}
        options={data}
        selectValue={value}
        onValueChange={(option) => onValueChange(option.value)}
      />
    )
  );
}

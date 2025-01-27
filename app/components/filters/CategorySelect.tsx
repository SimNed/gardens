import { KeyValueType } from "@/types/data";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import ComboBoxInput from "../inputs/ComboBoxInput";

interface CategorySelectProps {
  value: string;
  onValueChange: (data: KeyValueType<string>) => void;
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
      <ComboBoxInput
        label={"Catégories"}
        data={data}
        selectValue={value}
        onSelectChange={onValueChange}
      />
    )
  );
}

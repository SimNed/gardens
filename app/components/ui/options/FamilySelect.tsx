import { fetcher } from "@/app/lib/fetcher";
import useSWR from "swr";
import ComboBoxInput from "../inputs/ComboBoxInput";

interface FamilySelectProps {
  value: string;
  onValueChange: (data: string) => void;
}

export default function FamilySelect({
  value,
  onValueChange,
}: FamilySelectProps) {
  const { data, error, isLoading } = useSWR("/api/families/list", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  return (
    data && (
      <ComboBoxInput<string>
        label={"Famille"}
        data={data}
        selectValue={value}
        onSelectChange={(option) => onValueChange(option.value)}
      />
    )
  );
}

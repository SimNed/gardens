import { KeyValueType, ValueWithRelationType } from "@/types/data";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import ComboBoxInput from "../inputs/ComboBoxInput";

interface GenusSelectProps {
  value: string;
  onValueChange: (
    data: KeyValueType<ValueWithRelationType<string, string>>
  ) => void;
}

export default function GenusSelect({
  value,
  onValueChange,
}: GenusSelectProps) {
  const { data, error, isLoading } = useSWR("/api/genuses/list", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  return (
    data && (
      <ComboBoxInput
        label={"Genre"}
        data={data}
        selectValue={value}
        onSelectChange={onValueChange}
      />
    )
  );
}

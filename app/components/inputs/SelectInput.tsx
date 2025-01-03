import { Label } from "@/app/components/shadcn-ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/shadcn-ui/select";
import { KeyValueType } from "@/types/data";

interface SelectProps {
  options: KeyValueType[];
  selectValue: string;
  label?: string;
  placeholder?: string;
  optionsLabel?: string;
  onValueChange: (data: KeyValueType) => void;
}

const SelectInput = ({
  options,
  selectValue,
  label,
  placeholder = "sélection",
  optionsLabel,
  onValueChange,
}: SelectProps) => {
  return (
    <div className="p-2">
      {label && <Label>{label}</Label>}
      <div className="py-2">
        <Select
          value={selectValue}
          onValueChange={(e: string) => {
            const option = options.find((option) => option.value === e);
            if (option) onValueChange(option);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {optionsLabel && <SelectLabel>{optionsLabel}</SelectLabel>}
              {options.map((option) => (
                <SelectItem key={option.key} value={option.value}>
                  {option.key}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectInput;

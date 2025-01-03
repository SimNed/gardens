"use client";

import { Input } from "@/app/components/shadcn-ui/input";
import { Label } from "@/app/components/shadcn-ui/label";
import { KeyValueType } from "@/types/data";

interface NumberInputProps {
  label?: string;
  unit?: string;
  value: number;
  minRange?: number;
  maxRange?: number;
  onValueChange: (data: KeyValueType<number>) => void;
}

const NumberInput = ({
  label,
  unit,
  value,
  minRange = -99,
  maxRange = 99,
  onValueChange,
}: NumberInputProps) => {
  console.log(value);

  return (
    <div className="p-2">
      {label && <Label>{label}</Label>}
      <div className="flex items-center gap-4 my-2">
        <Input
          type="number"
          className="focus-visible:ring-0 w-18"
          id="max"
          placeholder="max"
          value={value}
          min={minRange}
          max={maxRange}
          onChange={(e) =>
            onValueChange({
              key: e.target.value,
              value: +e.target.value,
            })
          }
        />
        {unit && <Label htmlFor="max">{unit}</Label>}
      </div>
    </div>
  );
};

export default NumberInput;

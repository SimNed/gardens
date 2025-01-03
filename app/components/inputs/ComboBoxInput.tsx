import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils/style";
import { Button } from "@/app/components/shadcn-ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/shadcn-ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/shadcn-ui/popover";
import { Label } from "@/app/components/shadcn-ui/label";
import { KeyValueWithRelationType } from "@/types/data";

interface ComboBoxInputProps
  extends React.ComponentPropsWithRef<typeof Button> {
  data: KeyValueWithRelationType[];
  label?: string;
  placeholder?: string;
  inputPlaceholder?: string;
  notFoundPlaceholder?: string;
  selectValue: string;
  onSelectChange: (data: KeyValueWithRelationType) => void;
}

const ComboBoxInput = React.forwardRef<HTMLButtonElement, ComboBoxInputProps>(
  (
    {
      label,
      data,
      placeholder = "sélection",
      inputPlaceholder = "recherche",
      notFoundPlaceholder = "aucun résultat",
      selectValue,
      onSelectChange,
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="w-full p-2">
        <Popover open={open} onOpenChange={setOpen}>
          {label && <Label>{label}</Label>}
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("w-full justify-between", className)}
              {...props}
            >
              {selectValue
                ? data.find((d) => d.value === selectValue)?.key
                : placeholder}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
            <Command className="w-full">
              <CommandInput placeholder={inputPlaceholder} />
              <CommandList>
                <CommandEmpty>{notFoundPlaceholder}</CommandEmpty>
                {data && data.length > 0 && (
                  <CommandGroup>
                    {data.map((d) => (
                      <CommandItem
                        key={d.value}
                        value={d.key}
                        onSelect={() => {
                          setOpen(false);
                          onSelectChange({ ...d, value: d.value });
                        }}
                      >
                        {d.key}
                        <Check
                          className={cn(
                            "ml-auto",
                            selectValue === d.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

ComboBoxInput.displayName = "ComboBoxInput";

export default ComboBoxInput;

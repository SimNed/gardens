import * as React from "react";
import { ForwardedRef, forwardRef } from "react";
import { cn } from "@/app/lib/utils/style";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { Button } from "@/app/components/shadcn-ui/button";
import { Label } from "@/app/components/shadcn-ui/label";
import { KeyValueType } from "@/types/base";

export interface ComboBoxInputProps<T>
  extends React.ComponentPropsWithRef<typeof Button> {
  data: KeyValueType<T>[];
  selectValue: string;
  label?: string;
  placeholder?: string;
  inputPlaceholder?: string;
  notFoundPlaceholder?: string;
  onSelectChange: (data: KeyValueType<T>) => void;
}

const ComboBox = <T,>(
  {
    data,
    selectValue,
    label,
    placeholder = "sélection",
    inputPlaceholder = "sélection",
    notFoundPlaceholder,
    onSelectChange,
    className,
    ...props
  }: ComboBoxInputProps<T>,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = React.useState(false);

  const selectedItem = data.find(
    (d) => d.value === selectValue || d.value === (selectValue as string)
  );

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
            {selectedItem ? selectedItem.key : placeholder}
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
                      key={d.key}
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
                          selectValue === d.value ? "opacity-100" : "opacity-0"
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
};

const ComboBoxInput = forwardRef(ComboBox) as <T>(
  props: ComboBoxInputProps<T> & React.RefAttributes<HTMLButtonElement>
) => JSX.Element;

export default ComboBoxInput;

"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { countryFlags as listCountry } from "@/features/applicant/applicant.constants";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Separator } from "../ui/separator";

interface CountryFlags {
  [code: string]: {
    flag: string;
    name: string;
  };
}

export interface PhoneInputProps
  extends Omit<React.ComponentProps<typeof Input>, "onChange"> {
  countryFlags?: CountryFlags;
  value?: string;
  onChange?: (value: string) => void;
  countryCode?: string;
  onCountryChange?: (value: string) => void;
  defaultCountryCode?: string;
  containerClassName?: string;
  selectTriggerClassName?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      countryFlags = listCountry,
      value,
      onChange,
      countryCode,
      onCountryChange,
      defaultCountryCode = Object.keys(countryFlags)[0] ?? "+62",
      className,
      containerClassName,
      selectTriggerClassName,
      ...inputProps
    },
    ref
  ) => {
    const internalInputRef = useRef<HTMLInputElement>(null);
    const [internalCountryCode, setInternalCountryCode] = useState(
      countryCode ?? defaultCountryCode
    );
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
      if (countryCode && countryCode !== internalCountryCode) {
        setInternalCountryCode(countryCode);
      }
    }, [countryCode, internalCountryCode]);

    const handleCountryChange = (code: string) => {
      if (!countryCode) {
        setInternalCountryCode(code);
      }
      onCountryChange?.(code);
      setOpen(false);
    };

    const selectedCode = countryCode ?? internalCountryCode;

    const filteredCountries = useMemo(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return Object.entries(countryFlags).filter(([_code, { name }]) => {
        return name.toLowerCase().includes(search.toLowerCase());
      });
    }, [search, countryFlags]);

    return (
      <div
        className={cn(
          "flex cursor-text items-center rounded-lg border-2 border-neutral-400/40 shadow-xs",
          "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
          "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
          containerClassName
        )}
        tabIndex={0}
        onClick={() => internalInputRef.current?.focus()}
        {...inputProps}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex h-6 w-[50px] cursor-pointer items-center justify-center border-none pl-2 focus:ring-0 focus-visible:ring-0",
                selectTriggerClassName
              )}
            >
              <div className="flex items-center gap-2">
                {countryFlags[selectedCode] && (
                  <Image
                    src={countryFlags[selectedCode].flag}
                    alt={countryFlags[selectedCode].name}
                    width={24}
                    height={24}
                    className="h-4 w-4 rounded-full border border-neutral-400 object-cover"
                  />
                )}
                <ChevronDownIcon className="size-3 opacity-50" />
              </div>
            </button>
          </PopoverTrigger>

          <PopoverContent className="mt-2 w-[300px] p-0" align="start">
            <Command>
              <CommandInput
                placeholder="Search country..."
                value={search}
                onValueChange={setSearch}
              />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-auto border-t">
                {filteredCountries.map(([code, { flag, name }]) => (
                  <CommandItem
                    key={code}
                    value={`${name}-${code}`}
                    onSelect={() => handleCountryChange(code)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCode === code ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <Image
                      src={flag}
                      alt={name}
                      width={24}
                      height={24}
                      className="mr-2 h-4 w-4 rounded-full border border-neutral-400 object-cover"
                    />
                    <div className="flex w-full items-center justify-between">
                      <span>{name}</span>
                      <span>{code}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="mr-3 ml-2 h-6" />

        <span className="mt-[0.5] text-sm">{selectedCode}</span>

        <Input
          ref={(node) => {
            internalInputRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          type="tel"
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            "h-9 flex-1 border-none pl-1 shadow-none outline-none focus:outline-none focus-visible:border-none focus-visible:ring-0",
            className
          )}
          {...inputProps}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;

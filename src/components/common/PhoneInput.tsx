"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

interface CountryFlags {
  [code: string]: {
    flag: string;
    name: string;
  };
}

export interface PhoneInputProps
  extends Omit<React.ComponentProps<typeof Input>, "onChange"> {
  countryFlags: CountryFlags;
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
      countryFlags,
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
    };

    const selectedCode = countryCode ?? internalCountryCode;

    return (
      <div
        className={cn(
          "flex cursor-text gap-2 rounded-lg border-2 border-neutral-400/40 px-2 shadow-xs",
          "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
          containerClassName
        )}
        tabIndex={0}
        onClick={() => internalInputRef.current?.focus()}
      >
        <Select value={selectedCode} onValueChange={handleCountryChange}>
          <SelectTrigger
            className={cn(
              "h-6 w-[90px] cursor-pointer border-none px-0 focus:ring-0 focus-visible:ring-0",
              selectTriggerClassName
            )}
          >
            <SelectValue>
              <div className="flex items-center gap-2">
                {countryFlags[selectedCode] && (
                  <Image
                    src={countryFlags[selectedCode].flag}
                    alt={countryFlags[selectedCode].name}
                    width={24}
                    height={16}
                    className="h-4 w-6 rounded object-cover"
                  />
                )}
                <span className="text-sm">{selectedCode}</span>
              </div>
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {Object.entries(countryFlags).map(([code, { flag, name }]) => (
              <SelectItem key={code} value={code}>
                <div className="flex items-center gap-2">
                  <Image
                    src={flag}
                    alt={name}
                    width={24}
                    height={16}
                    className="h-4 w-6 rounded object-cover"
                  />
                  <span>
                    {code} ({name})
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Separator orientation="vertical" className="my-2" />
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
            "h-9 flex-1 border-none shadow-none outline-none focus:outline-none focus-visible:border-none focus-visible:ring-0",
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

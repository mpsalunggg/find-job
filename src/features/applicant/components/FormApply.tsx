"use client";

import PhoneInput from "@/components/common/PhoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowDownTrayIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import { countryFlags } from "../applicant.constant";
import { Calendar } from "@/components/ui/calendar";

const FormApply = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div className="space-y-4 px-6">
      <p className="text-danger-main text-xs font-bold">* Required</p>
      <div className="space-y-2">
        <Label>Photo Profile</Label>
        <Image
          src="/images/default-profile.png"
          width={200}
          height={200}
          alt="image-profile"
          className="h-32 w-32 rounded-xl"
        />
        <Button variant="outline" className="border-neutral-200 font-bold">
          <ArrowDownTrayIcon strokeWidth={2} />
          Take a Picture
        </Button>
      </div>
      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input placeholder="" />
      </div>
      <div className="space-y-2">
        <Label>Date of birth</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="h-10 w-full justify-between border-2 border-neutral-400/40 font-normal"
            >
              {date ? date.toLocaleDateString() : "sd"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2">
        <Label>Gender</Label>
        <RadioGroup defaultValue="comfortable" className="flex">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-2">
        <Label>Phone number</Label>
        <PhoneInput countryFlags={countryFlags} />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input type="email" placeholder="budiyanto@mail.com" />
      </div>
      <div className="space-y-2">
        <Label>Link LinkedIn</Label>
        <Input type="url" placeholder="https://www.linkedin.com/in/username" />
      </div>
    </div>
  );
};

export default FormApply;

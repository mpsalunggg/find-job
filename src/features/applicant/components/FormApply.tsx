"use client";

import z from "zod";
import { useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowUpTrayIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import PhoneInput from "@/components/common/PhoneInput";

import UploadImageProfile from "./UploadImageProfile";
import { generateZodSchema } from "../applicant.schemas";
import { FormFieldType } from "../applicant.types";
import { checkMandatory } from "../applicant.utils";
import { cn } from "@/lib/utils";
import { useApplyJob } from "../applicant.hooks";

interface FormApplyProps {
  dataForm?: FormFieldType[];
  jobId: string;
}

const FormApply = ({ dataForm = [], jobId }: FormApplyProps) => {
  const { mutate, isPending } = useApplyJob();
  const schema = generateZodSchema(dataForm);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: Object.fromEntries(dataForm.map((f) => [f.key, ""])),
  });

  const { setValue, watch } = form;

  const [openCamera, setOpenCamera] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const handleSubmit = (values: z.infer<typeof schema>) => {
    mutate({
      jobId,
      dateOfBirth: values.dateOfBirth
        ? format(values.dateOfBirth as Date, "yyyy-MM-dd")
        : undefined,
      ...values,
    });
  };

  return (
    <div className="space-y-4 text-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-4 border-x px-4 pb-8 lg:px-16">
            <p className="text-danger-main font-bold">* Required</p>
            {dataForm
              .sort((a, b) => a.order - b.order)
              .map((field: FormFieldType) => (
                <FormField
                  key={field.key}
                  control={form.control}
                  name={field.key}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel className="gap-0 text-neutral-900">
                        {field.label}
                        {checkMandatory(field.requirement) && (
                          <span className="text-danger-main">*</span>
                        )}
                      </FormLabel>

                      <FormControl>
                        {(() => {
                          // eslint-disable-next-line react-hooks/incompatible-library
                          const value = watch(field.key);

                          switch (field.fieldType) {
                            case "file":
                              return (
                                <div className="space-y-2">
                                  <Image
                                    src={
                                      (value as string) ||
                                      "/images/default-profile.png"
                                    }
                                    width={200}
                                    height={200}
                                    alt="image-profile"
                                    className="h-32 w-32 rounded-xl object-cover"
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className="border-neutral-200 font-bold shadow-sm"
                                    onClick={() => setOpenCamera(true)}
                                  >
                                    <ArrowUpTrayIcon strokeWidth={2} />
                                    Take a Picture
                                  </Button>
                                  <UploadImageProfile
                                    open={openCamera}
                                    onClose={() => setOpenCamera(false)}
                                    onCapture={(img) => {
                                      setValue(field.key, img);
                                      form.clearErrors(field.key);
                                    }}
                                  />
                                </div>
                              );

                            case "text":
                            case "email":
                            case "url":
                              return (
                                <Input
                                  type={field.fieldType}
                                  placeholder={field.placeholder ?? ""}
                                  {...formField}
                                  value={formField.value as string}
                                  onChange={(e) =>
                                    formField.onChange(e.target.value)
                                  }
                                />
                              );

                            case "tel":
                              return (
                                <PhoneInput
                                  placeholder={field?.placeholder as string}
                                  {...formField}
                                  value={formField.value as string}
                                  onChange={formField.onChange}
                                />
                              );

                            case "date":
                              return (
                                <Popover
                                  open={openDate}
                                  onOpenChange={setOpenDate}
                                >
                                  <PopoverTrigger asChild>
                                    <Button
                                      data-invalid={
                                        !!form.formState.errors[field.key]
                                      }
                                      variant="outline"
                                      className={cn(
                                        "h-10 w-full justify-between rounded-lg border-2 border-neutral-400/40 font-normal",
                                        "data-[invalid=true]:border-destructive data-[invalid=true]:ring-destructive/20"
                                      )}
                                    >
                                      {formField.value ? (
                                        format(
                                          formField.value as string,
                                          "d MMMM yyyy"
                                        )
                                      ) : (
                                        <span className="text-muted-foreground">
                                          {field.placeholder ?? "Select date"}
                                        </span>
                                      )}
                                      <ChevronDownIcon className="size-4 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={formField.value as Date}
                                      onSelect={(d) => {
                                        formField.onChange(d);
                                        setOpenDate(false);
                                      }}
                                    />
                                  </PopoverContent>
                                </Popover>
                              );

                            case "radio":
                              return (
                                <RadioGroup
                                  value={formField.value as string}
                                  onValueChange={formField.onChange}
                                  className="flex"
                                >
                                  <div className="flex gap-3">
                                    <RadioGroupItem
                                      value="female"
                                      id="female"
                                    />
                                    <Label htmlFor="female">
                                      She/her (Female)
                                    </Label>
                                  </div>
                                  <div className="flex gap-3">
                                    <RadioGroupItem value="male" id="male" />
                                    <Label htmlFor="male">He/him (Male)</Label>
                                  </div>
                                </RadioGroup>
                              );

                            case "select":
                              return (
                                <Select
                                  value={formField.value as string}
                                  onValueChange={formField.onChange}
                                >
                                  <SelectTrigger
                                    data-invalid={
                                      !!form.formState.errors[field.key]
                                    }
                                    className={cn(
                                      "hover:bg-accent min-h-[40px] w-full rounded-lg border-neutral-400/40",
                                      "data-[invalid=true]:border-destructive data-[invalid=true]:ring-destructive/20"
                                    )}
                                  >
                                    <SelectValue
                                      placeholder={
                                        field.placeholder ?? "Select"
                                      }
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="palu">Palu</SelectItem>
                                    <SelectItem value="jakarta">
                                      Jakarta
                                    </SelectItem>
                                    <SelectItem value="bali">Bali</SelectItem>
                                    <SelectItem value="bandung">
                                      Bandung
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              );

                            default:
                              return null;
                          }
                        })()}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
          </div>
          <div className="sticky bottom-0 w-full border-t bg-white p-0 px-4 py-6 lg:px-10">
            <Button
              loading={isPending}
              variant="primary-solid"
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FormApply;

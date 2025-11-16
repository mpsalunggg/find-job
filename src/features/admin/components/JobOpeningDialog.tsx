"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_PROFILE_FIELDS, JOB_TYPES } from "../job.constants";
import { Card, CardContent } from "@/components/ui/card";
import { JobFormSchema } from "../job.schema";
import { useCreateJob } from "../job.hook";
import {
  JobFormType,
  ProfileFieldRequirementType,
  ProfileFieldType,
} from "../job.type";

interface JobOpeningDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const JobOpeningDialog = ({
  open,
  onOpenChange,
}: JobOpeningDialogProps) => {
  const { mutate: createJob, isPending } = useCreateJob();

  const [profileFields, setProfileFields] = useState<ProfileFieldType[]>(
    DEFAULT_PROFILE_FIELDS
  );

  const form = useForm<JobFormType>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      title: "",
      jobType: "",
      description: "",
      numberOfCandidates: "",
      salaryMin: "",
      salaryMax: "",
    },
  });

  const handleProfileRequirementChange = (
    index: number,
    requirement: ProfileFieldRequirementType
  ) => {
    const updated = [...profileFields];
    updated[index].requirement = requirement;
    setProfileFields(updated);
  };

  const onSubmit = (data: JobFormType) => {
    const apiData = {
      title: data.title,
      jobType: data.jobType,
      description: data.description,
      numberOfCandidates: data.numberOfCandidates,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      profileFields: profileFields.map((field) => ({
        key: field.key,
        label: field.label,
        fieldType: field.fieldType,
        placeholder: field.placeholder,
        helpText: field.helpText,
        requirement: field.requirement,
        order: field.order,
      })),
    };

    createJob(apiData, {
      onSuccess: () => {
        form.reset();
        setProfileFields(DEFAULT_PROFILE_FIELDS);
        onOpenChange?.(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="scrollbar-stroke max-h-[90vh] w-full overflow-y-auto p-0 sm:min-w-[500px] md:min-w-[700px] lg:min-w-[900px]">
        <DialogHeader className="border-b p-6">
          <DialogTitle className="text-xl font-bold">Job Opening</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="gap-0">
                    Job Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. Front End Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="gap-0">
                    Job Type<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10! w-full">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {JOB_TYPES.map((type) => (
                        <SelectItem
                          key={type}
                          value={type.toLowerCase()}
                          className="font-bold"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="gap-0">
                    Job Description<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex."
                      rows={5}
                      className="min-h-[88px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfCandidates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="gap-0">
                    Number of Candidates Needed
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Ex. 2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <Label>Job Salary</Label>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-17 md:items-start">
                <div className="space-y-2 md:col-span-8">
                  <FormField
                    control={form.control}
                    name="salaryMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-neutral-500">
                              Rp
                            </span>
                            <Input
                              className="pl-9"
                              placeholder="7.000.000"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="hidden justify-center md:col-span-1 lg:flex">
                  <Separator className="mt-5 w-full" />
                </div>

                <div className="space-y-2 md:col-span-8">
                  <FormField
                    control={form.control}
                    name="salaryMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-neutral-500">
                              Rp
                            </span>
                            <Input
                              className="pl-9"
                              placeholder="8.000.000"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Card className="space-y-4 rounded-sm p-0 shadow-none">
              <CardContent className="p-4">
                <Label className="text-base font-semibold">
                  Minimum Profile Information Required
                </Label>
                <div className="space-y-3 p-2">
                  <>
                    {profileFields.map((field, index) => (
                      <div key={index}>
                        <div className="flex flex-col justify-between gap-2 py-3 lg:flex-row lg:items-center">
                          <span className="text-sm">{field.label}</span>

                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant={
                                field.requirement === "MANDATORY"
                                  ? "primary"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                handleProfileRequirementChange(
                                  index,
                                  "MANDATORY"
                                )
                              }
                              className="rounded-full"
                            >
                              Mandatory
                            </Button>

                            <Button
                              type="button"
                              variant={
                                field.requirement === "OPTIONAL"
                                  ? "primary"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                handleProfileRequirementChange(
                                  index,
                                  "OPTIONAL"
                                )
                              }
                              className="rounded-full"
                            >
                              Optional
                            </Button>

                            <Button
                              type="button"
                              variant={
                                field.requirement === "OFF"
                                  ? "primary"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                handleProfileRequirementChange(index, "OFF")
                              }
                              className="rounded-full"
                            >
                              Off
                            </Button>
                          </div>
                        </div>

                        {index < profileFields.length - 1 && (
                          <Separator className="my-1" />
                        )}
                      </div>
                    ))}
                  </>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="submit" loading={isPending} variant="primary-solid">
                {"Publish"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

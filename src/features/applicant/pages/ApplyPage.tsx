"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import FormApply from "../components/FormApply";
import { useGetListFormFields } from "../applicant.hooks";
import { Skeleton } from "@/components/ui/skeleton";

export default function ApplyPage() {
  const params = useParams();
  const { data: listFormField, isLoading: loadingFormField } =
    useGetListFormFields(params.id as string);

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-neutral-50 p-4">
      <div className="mx-auto w-full max-w-[700px]">
        {loadingFormField ? (
          <Skeleton className="h-[90vh] w-full" />
        ) : (
          <Card className="relative h-[90vh] gap-0 overflow-hidden rounded-none border border-none border-neutral-200 bg-white p-0 shadow-none">
            <CardContent className="no-scrollbar relative m-0 h-full overflow-y-auto px-0">
              <div className="flex gap-2 border-x border-t px-4 pt-4 pb-6 lg:gap-4 lg:px-10 lg:pt-10">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-neutral h-7 w-7 border-2 p-1"
                >
                  <ArrowLeftIcon strokeWidth={4} />
                </Button>
                <p className="text-lg font-bold">Apply Front End at Rakamin</p>
              </div>
              <FormApply
                dataForm={listFormField?.data?.formFields}
                jobId={params.id as string}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

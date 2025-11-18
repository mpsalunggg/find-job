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

  console.log("dataaa", listFormField?.data);
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-neutral-50 p-4">
      <div className="mx-auto w-full max-w-[700px]">
        {loadingFormField ? (
          <Skeleton className="h-[90vh] w-full" />
        ) : (
          <Card className="relative h-[90vh] gap-0 overflow-hidden rounded-none border border-none border-neutral-200 bg-white p-0 shadow-none">
            <CardContent className="m-0 h-full space-y-6 overflow-y-auto border p-10">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-neutral h-7 w-7 border-2 p-1"
                >
                  <ArrowLeftIcon strokeWidth={4} />
                </Button>
                <p className="text-lg font-bold">Apply Front End at Rakamin</p>
              </div>
              <FormApply />
            </CardContent>

            <CardFooter className="sticky bottom-0 w-full border-none bg-white p-0 px-10 py-6">
              <Button variant="primary-solid" className="w-full">
                Submit
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </section>
  );
}

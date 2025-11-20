import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { FieldRequirement, JobStatus } from "@prisma/client";
import { successResponse, errorResponse } from "@/utils/response";
import { determineJobStatus } from "@/features/admin/admin.utils";
import { UpdateJobType } from "@/features/admin/admin.types";

async function updateJobService(
  data: UpdateJobType & { status?: string },
  userId: string
) {
  const trimmedTitle = data.title.trim();
  const trimmedDescription = data.description.trim();

  let finalStatus: JobStatus;
  let finalStartedOn: Date | null;

  if (data.status) {
    finalStatus = data.status as JobStatus;
    finalStartedOn = data.status === "ACTIVE" ? new Date() : null;
  } else {
    const { status, startedOn } = determineJobStatus({
      ...data,
      title: trimmedTitle,
      description: trimmedDescription,
    });
    finalStatus = status as JobStatus;
    finalStartedOn = startedOn;
  }

  const job = await prisma.$transaction(async (tx) => {
    const existingJob = await tx.job.findFirst({
      where: {
        id: data.id,
        createdById: userId,
      },
    });

    if (!existingJob) {
      return errorResponse("Job not found", 404);
    }

    const updatedJob = await tx.job.update({
      where: { id: data.id },
      data: {
        title: trimmedTitle,
        jobType: data.jobType,
        description: trimmedDescription,
        numberOfCandidates: Number(data.numberOfCandidates),
        salaryMin: Number(data.salaryMin) || null,
        salaryMax: Number(data.salaryMax) || null,
        status: finalStatus,
        startedOn: finalStartedOn,
      },
    });

    await tx.jobFormField.deleteMany({
      where: { jobId: data.id },
    });

    const formFieldsData = data.profileFields.map((field) => ({
      jobId: updatedJob.id,
      key: field.key,
      label: field.label,
      fieldType: field.fieldType,
      placeholder: field.placeholder,
      helpText: field.helpText,
      order: field.order,
      requirement: field.requirement as FieldRequirement,
    }));

    await tx.jobFormField.createMany({
      data: formFieldsData,
    });

    return updatedJob;
  });

  return job;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return errorResponse("Unauthorized", 401);
    }

    const { id } = await params;
    const body = await request.json();
    const jobData = { ...body, id };

    const job = await updateJobService(jobData, userId);

    return successResponse("Job vacancy successfully updated", { job }, 200);
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to update job data", 500);
  }
}

import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/utils/response";
import { determineJobStatus, generateSlug } from "@/features/admin/admin.utils";
import { CreateJobType } from "@/features/admin/admin.types";

async function createJobService(data: CreateJobType, userId: string) {
  const trimmedTitle = data.title.trim();
  const trimmedDescription = data.description.trim();

  const { status, startedOn } = determineJobStatus({
    ...data,
    title: data.title.trim(),
    description: data.description.trim(),
  });
  let slug = generateSlug(trimmedTitle);

  const job = await prisma.$transaction(async (tx) => {
    let existingJob = await tx.job.findUnique({ where: { slug } });
    let counter = 1;

    while (existingJob) {
      slug = `${generateSlug(trimmedTitle)}-${counter}`;
      existingJob = await tx.job.findUnique({ where: { slug } });
      counter++;
    }

    const createdJob = await tx.job.create({
      data: {
        slug,
        title: trimmedTitle,
        jobType: data.jobType,
        description: trimmedDescription,
        numberOfCandidates: Number(data.numberOfCandidates),
        salaryMin: Number(data.salaryMin) || null,
        salaryMax: Number(data.salaryMax) || null,
        status,
        startedOn,
        createdById: userId,
      },
    });

    const formFieldsData = data.profileFields.map((field) => {
      return {
        jobId: createdJob.id,
        key: field.key,
        label: field.label,
        fieldType: field.fieldType,
        placeholder: field.placeholder,
        helpText: field.helpText,
        order: field.order,
        requirement: field.requirement,
      };
    });

    await tx.jobFormField.createMany({
      data: formFieldsData,
    });

    return createdJob;
  });

  return job;
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return errorResponse("Unauthorized", 401);
    }

    const body = await request.json();

    const job = await createJobService(body, userId);

    return successResponse(
      job?.status === "ACTIVE"
        ? "Job vacancy successfully created"
        : "Job saved as draft successfully",
      201
    );
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to create job data", 500);
  }
}

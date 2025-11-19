import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/utils/response";
import { ApplyJobPayload } from "@/features/applicant/applicant.types";

async function applyJobService(data: ApplyJobPayload, userId: string) {
  const { jobId, ...candidateData } = data;

  return await prisma.$transaction(async (tx) => {
    let candidate = await tx.candidate.findUnique({
      where: { userId },
    });

    if (!candidate) {
      candidate = await tx.candidate.create({
        data: {
          userId,
          email: candidateData.email || "",
          phoneNumber: candidateData.phoneNumber || null,
          fullName: candidateData.fullName || null,
          photoUrl: candidateData.photoUrl || null,
          gender: candidateData.gender || null,
          domicile: candidateData.domicile || null,
          linkedinUrl: candidateData.linkedinUrl || null,
          dateOfBirth: candidateData.dateOfBirth
            ? new Date(candidateData.dateOfBirth)
            : null,
        },
      });
    }

    const existingApplication = await tx.application.findFirst({
      where: {
        jobId,
        candidateId: candidate.id,
      },
    });

    if (existingApplication) {
      throw new Error("ALREADY_APPLIED");
    }

    const lastApplication = await tx.application.findFirst({
      where: { jobId },
      orderBy: { position: "desc" },
    });

    const newPosition = lastApplication ? lastApplication.position + 1 : 1;

    const application = await tx.application.create({
      data: {
        jobId,
        candidateId: candidate.id,
        position: newPosition,
        status: "SUBMITTED",
      },
      include: {
        job: {
          select: {
            title: true,
          },
        },
      },
    });

    return application;
  });
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return errorResponse("Unauthorized", 401);
    }

    const body = await request.json();

    if (!body.jobId) {
      return errorResponse("Job ID is required", 400);
    }

    const job = await prisma.job.findUnique({
      where: { id: body.jobId },
    });

    if (!job) {
      return errorResponse("Job not found", 404);
    }

    if (job.status !== "ACTIVE") {
      return errorResponse(
        "This job is not currently accepting applications",
        400
      );
    }

    await applyJobService(body, userId);

    return successResponse("Application submitted successfully", 201);
  } catch (error) {
    console.error(error);
    if ((error as Error).message === "ALREADY_APPLIED") {
      return errorResponse("You have already applied to this job", 400);
    }

    return errorResponse("Failed to submit application", 500);
  }
}

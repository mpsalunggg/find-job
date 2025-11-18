import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/utils/response";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const job = await prisma.job.findUnique({
      where: { id },
      select: {
        title: true,
      },
    });

    if (!job) {
      return errorResponse("Job not found", 404);
    }

    const formFields = await prisma.jobFormField.findMany({
      where: {
        jobId: id,
      },
      orderBy: {
        order: "asc",
      },
      select: {
        id: true,
        key: true,
        label: true,
        fieldType: true,
        placeholder: true,
        helpText: true,
        order: true,
        requirement: true,
      },
    });

    return successResponse(
      "Success get job form fields",
      { job, ...formFields },
      200
    );
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to get job form fields", 500);
  }
}

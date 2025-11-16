import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/utils/response";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return errorResponse("Unauthorized", 401);
    }

    const { searchParams } = request.nextUrl;
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "desc";

    const validSorts = ["asc", "desc"];
    const sortOrder = validSorts.includes(sort) ? sort : "desc";

    const jobs = await prisma.job.findMany({
      where: {
        createdById: userId,
        ...(search && {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              jobType: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
      },
      include: {
        formFields: {
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        createdAt: sortOrder as "asc" | "desc",
      },
    });

    return successResponse(
      "Success get job list",
      jobs.map((job) => ({
        id: job.id,
        slug: job.slug,
        title: job.title,
        jobType: job.jobType,
        description: job.description,
        numberOfCandidates: job.numberOfCandidates,
        status: job.status,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryCurrency: job.salaryCurrency,
        startedOn: job.startedOn,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
        formFields: job.formFields.map((field) => ({
          id: field.id,
          key: field.key,
          label: field.label,
          fieldType: field.fieldType,
          placeholder: field.placeholder,
          helpText: field.helpText,
          order: field.order,
          requirement: field.requirement,
          validationRules: field.validationRules,
        })),
      })),
      200
    );
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to get job list", 500);
  }
}

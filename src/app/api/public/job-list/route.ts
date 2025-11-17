import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, errorResponse } from "@/utils/response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "desc";

    const validSorts = ["asc", "desc"];
    const sortOrder = validSorts.includes(sort) ? sort : "desc";

    const jobs = await prisma.job.findMany({
      where: {
        status: "ACTIVE",
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
      "Success get public job list",
      jobs.map((job) => ({
        id: job.id,
        title: job.title,
        jobType: job.jobType,
        description: job.description,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
      })),
      200
    );
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to get public job list", 500);
  }
}

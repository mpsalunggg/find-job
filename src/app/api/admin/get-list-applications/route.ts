import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/client";
import { paginatedResponse, errorResponse } from "@/utils/response";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return errorResponse("Unauthorized", 401);
    }

    const { searchParams } = request.nextUrl;
    const jobId = searchParams.get("jobId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status =
      searchParams.get("status") === "all"
        ? undefined
        : searchParams.get("status") || "";

    if (!jobId) {
      return errorResponse("Job ID is required", 400);
    }

    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        createdById: userId,
      },
      select: {
        id: true,
        title: true,
      },
    });

    if (!job) {
      return errorResponse("Job not found or access denied", 404);
    }

    const whereClause: Prisma.ApplicationWhereInput = {
      jobId: jobId,
    };

    if (search) {
      whereClause.OR = [
        { candidate: { fullName: { contains: search, mode: "insensitive" } } },
        { candidate: { email: { contains: search, mode: "insensitive" } } },
        {
          candidate: { phoneNumber: { contains: search, mode: "insensitive" } },
        },
      ];
    }

    if (status) {
      whereClause.status =
        status as Prisma.EnumApplicationStatusFilter<"Application">;
    }

    const total = await prisma.application.count({
      where: whereClause,
    });

    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(total / limit);

    const applications = await prisma.application.findMany({
      where: whereClause,
      include: {
        candidate: true,
      },
      skip: skip,
      take: limit,
    });

    const items = applications.map((app) => ({
      id: app.id,
      fullName: app.candidate.fullName,
      email: app.candidate.email,
      phoneNumber: app.candidate.phoneNumber,
      dateOfBirth: app.candidate.dateOfBirth
        ? new Date(app.candidate.dateOfBirth).toISOString().split("T")[0]
        : null,
      domicile: app.candidate.domicile,
      gender: app.candidate.gender,
      linkedinUrl: app.candidate.linkedinUrl,
      status: app.status,
    }));

    return paginatedResponse(
      "Success get candidate applications",
      items,
      {
        total,
        page,
        limit,
        totalPages,
      },
      200,
      {
        jobTitle: job.title,
      }
    );
  } catch (error) {
    console.error(error);
    return errorResponse("Failed to get candidate applications", 500);
  }
}

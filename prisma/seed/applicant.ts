import { PrismaClient } from "../../src/generated/client";
import { hashPassword } from "@/lib/bcrypt";

export async function seedApplicant(prisma: PrismaClient) {
  console.log("Process create applicant user...");

  const applicantRole = await prisma.role.findUnique({
    where: { name: "Applicant" },
  });

  if (!applicantRole) {
    throw new Error("Applicant role not found. Please run seedRoles first.");
  }

  const hashedPassword = await hashPassword("123456789");

  const applicantUser = await prisma.user.upsert({
    where: { email: "applicant@findJob.com" },
    update: {},
    create: {
      email: "applicant@findJob.com",
      password: hashedPassword,
      roles: {
        create: {
          roleId: applicantRole.id,
        },
      },
    },
  });

  console.log("Success create applicant user");

  return applicantUser;
}

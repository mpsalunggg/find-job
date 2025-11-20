import { hashPassword } from "@/lib/bcrypt";
import { PrismaClient } from "@prisma/client";

export async function seedAdmin(prisma: PrismaClient) {
  console.log("Process create admin user...");

  const adminRole = await prisma.role.findUnique({
    where: { name: "Admin" },
  });

  if (!adminRole) {
    throw new Error("Admin role not found. Please run seedRoles first.");
  }

  const hashedPassword = await hashPassword("123456789");

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@findJob.com" },
    update: {},
    create: {
      email: "admin@findJob.com",
      password: hashedPassword,
      roles: {
        create: {
          roleId: adminRole.id,
        },
      },
    },
  });

  console.log("Success create admin user");

  return adminUser;
}

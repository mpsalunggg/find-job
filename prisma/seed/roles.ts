/* eslint-disable @typescript-eslint/no-explicit-any */
export async function seedRoles(prisma: any) {
  console.log("Process create role...");
  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: {
      name: "Admin",
      description:
        "Full system access - can manage jobs, users, and all settings",
    },
  });

  const applicantRole = await prisma.role.upsert({
    where: { name: "Applicant" },
    update: {},
    create: {
      name: "Applicant",
      description: "Can apply to jobs and manage own applications",
    },
  });

  console.log("Success create role");
  return { adminRole, applicantRole };
}

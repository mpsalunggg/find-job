import { PrismaClient } from "@prisma/client";
import { seedRoles } from "./seed/roles";
import { seedAdmin } from "./seed/admin";
import { seedApplicant } from "./seed/applicant";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seed...\n");

  await seedRoles(prisma);
  await seedAdmin(prisma);
  await seedApplicant(prisma);

  console.log("\nDatabase seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

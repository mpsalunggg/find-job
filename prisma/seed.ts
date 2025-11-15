import { PrismaClient } from "../src/generated/client";
import { seedRoles } from "./seed/roles";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seed...\n");

  await seedRoles(prisma);

  console.log("\n Database seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

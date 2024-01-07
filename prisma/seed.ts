import { createLanguage } from "@/helpers/db";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await createLanguage({ code: "ar", name: "العربية" });
  await createLanguage({ code: "en", name: "English" });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


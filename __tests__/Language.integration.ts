import prisma from "@/helpers/client";
import { createLanguage } from "@/helpers/db";

beforeAll(async () => {
  console.log("THIS SHOULD BE RAN BEFORE EVERYTHING");
});

afterAll(async () => {
  console.log("Clean up");
  const deleteLanguages = prisma.language.deleteMany();
  await prisma.$transaction([deleteLanguages]);
  await prisma.$disconnect();
});

it("Should create new language", async () => {
  const language = { code: "en", name: "English" };

  prisma.language.create({ data: { id: 1, ...language } });

  await expect(createLanguage(language)).resolves.toEqual({
    id: 1,
    ...language,
  });
});

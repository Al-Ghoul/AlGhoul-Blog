import { createLanguage } from "@/helpers/db";
import { prismaMock } from "@/helpers/singleton";

test("Should create new language", async () => {
  const language = { code: "en", name: "English" };

  prismaMock.language.create.mockResolvedValue({ id: 1, ...language });

  await expect(createLanguage(language)).resolves.toEqual({
    id: 1,
    ...language,
  });
});

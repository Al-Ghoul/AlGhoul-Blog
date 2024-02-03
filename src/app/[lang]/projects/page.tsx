import { loadLocaleAsync } from "@/i18n/i18n-util.async";
import { i18nObject } from "@/i18n/i18n-util";
import type { Locales } from "@/i18n/i18n-types";
import type { Metadata } from "next";
import Header from "@/components/general/Header";
import { getMetaData } from "@/helpers";
import ProjectsSection from "@/components/general/ProjectsSection";

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  await loadLocaleAsync(params.lang as Locales);
  const LL = i18nObject(params.lang as Locales);

  return {
    title: LL.PROJECTS_PAGE(),
    description: LL.DESCRIPTION_PROJECTS(),
    ...getMetaData(
      {
        params: {
          title: `${LL.siteTitle()} | ${LL.PROJECTS_PAGE()}`,
          languageCode: params.lang,
          description: LL.DESCRIPTION_PROJECTS(),
          currentPath: "/projects",
        },
      },
    ),
  };
}

export default async function ProjectsPage({ params }: PageProps) {
  await loadLocaleAsync(params.lang as Locales);
  const LL = i18nObject(params.lang as Locales);

  return (
    <>
      <Header lang={params.lang} />

      <main className="flex min-h-screen p-1 md:px-48">
        <div
          className="flex flex-col flex-1 mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-blue-800/30 rounded-xl p-3"
          dir={params.lang == "ar" ? "rtl" : ""}
        >
          <h1 className="mx-auto text-xl md:text-3xl whitespace-nowrap text-[#f53c3c] font-aref">
            {LL.siteTitle()}
          </h1>

          <ProjectsSection
            langCode={params.lang}
            headerMessage={LL.PROJECTS_HEADER()}
            introMessage={LL.PROJECTS_INTRO()}
          />
        </div>
      </main>
    </>
  );
}
interface PageProps {
  params: {
    lang: Locales;
  };
}

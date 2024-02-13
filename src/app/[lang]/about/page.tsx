import { loadLocaleAsync } from "@/i18n/i18n-util.async";
import { i18nObject } from "@/i18n/i18n-util";
import type { Locales } from "@/i18n/i18n-types";
import type { Metadata } from "next";
import Header from "@/components/general/Header";
import AboutMeAR from "@/components/MDXContent/AboutMe_AR.mdx";
import AboutMeEN from "@/components/MDXContent/AboutMe_EN.mdx";
import { getMetaData } from "@/helpers";

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  await loadLocaleAsync(params.lang as Locales);
  const LL = i18nObject(params.lang as Locales);

  return {
    title: LL.ABOUT_ME(),
    description: LL.DESCRIPTION_ABOUT(),
    ...getMetaData(
      {
        params: {
          title: `${LL.siteTitle()} | ${LL.ABOUT_ME()}`,
          languageCode: params.lang,
          description: LL.DESCRIPTION_ABOUT(),
          currentPath: "/about",
        },
      },
    ),
  };
}

export default async function About({ params }: PageProps) {
  await loadLocaleAsync(params.lang as Locales);
  const LL = i18nObject(params.lang as Locales);

  return (
    <>
      <Header lang={params.lang} />

      <main className="flex min-h-screen p-1 md:px-48">
        <div className="flex flex-col min-w-full mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-blue-800/30 rounded-xl p-3">
          <h1 className="self-center text-xl md:text-3xl whitespace-nowrap text-[#f53c3c] font-aref">
            {LL.siteTitle()}
          </h1>

          <article
            className="prose max-w-max prose-p:text-white prose-headings:text-white
                             prose-a:decoration-black prose-strong:text-white prose-code:text-white
                              prose-a:text-white prose-p:font-semibold prose-a:font-semibold
                              prose-code:bg-blue-800/70 marker:text-white font-cairo"
            dir={params.lang == "ar" ? "rtl" : ""}
          >
            {params.lang == "ar" ? <AboutMeAR /> : <AboutMeEN />}
          </article>
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

import '@/app/globals.css';
import { type Metadata } from 'next/types';
import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { getMetaData } from '@/helpers';


export async function generateMetadata({ params }: { params: PageProps }): Promise<Metadata> {
  await loadLocaleAsync(params.lang);
  const LL = i18nObject(params.lang);

  return {
    title: {
      default: LL.siteTitle(),
      template: `%s | ${LL.siteTitle()}`,
    },
    description: LL.DESCRIPTION(),
    ...getMetaData(
      {
        params: {
          title: `${LL.siteTitle()} | ${LL.siteTitlePostfix()}`,
          languageCode: params.lang,
          description: LL.DESCRIPTION(),
          currentPath: `/${params.lang}`,
          dropAlternates: true
        }
      }
    )
  }
}

export default async function MainLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <section>

      {children}

    </section>
  )
}



interface PageProps {
  lang: Locales
}
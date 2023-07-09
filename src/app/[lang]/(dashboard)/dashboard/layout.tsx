import '@/app/globals.css';
import { type Metadata } from 'next/types';
import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import { CairoFont, Aref_Ruqaa, inter } from '@/helpers/fonts';
import Header from '@/components/general/Header';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: PageProps }): Promise<Metadata> {

  await loadLocaleAsync(params.lang);
  const LL = i18nObject(params.lang);

  return {
    title: LL.siteTitle(),
  }
}

export default async function DashboardLayout({
  children, params
}: {
  children: React.ReactNode,
  params: PageProps
}) {
  await loadLocaleAsync(params.lang);
  const LL = i18nObject(params.lang);

  return (
    <section>
      {children}
    </section>
  )
}



interface PageProps {
  lang: "ar" | "en"
}
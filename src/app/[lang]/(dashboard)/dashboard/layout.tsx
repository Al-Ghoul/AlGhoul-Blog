import '@/app/globals.css';
import { type Metadata } from 'next/types';
import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import DashboardHeader from '@/components/general/DashboardHeader';
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { Locales } from '@/i18n/i18n-types';

export async function generateMetadata({ params }: { params: PageProps }): Promise<Metadata> {

  await loadLocaleAsync(params.lang);
  const LL = i18nObject(params.lang);

  return {
    title: LL.siteTitle(),
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        notranslate: true,
      },
    },
  }
}

export default async function DashboardLayout({
  children, params
}: {
  children: React.ReactNode,
  params: PageProps
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user.is_admin) redirect('/');
  await loadLocaleAsync(params.lang);
  const LL = i18nObject(params.lang);


  return (
    <>
      <DashboardHeader lang={params.lang} />
      <section>
        {children}
      </section>
    </>
  )
}



interface PageProps {
  lang: Locales
}
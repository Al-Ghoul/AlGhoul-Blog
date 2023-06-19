
import { loadLocaleAsync } from '@/i18n/i18n-util.async'
import { i18nObject } from '@/i18n/i18n-util'
import type { Locales } from '@/i18n/i18n-types';


export default async function Home({ params }: PageProps) {
  await loadLocaleAsync(params.lang as Locales);
  const LL = i18nObject(params.lang as Locales);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {LL.HI({ name: 'الغول' })}
    </main>
  )
}


interface PageProps {
  params: { lang: string }
}
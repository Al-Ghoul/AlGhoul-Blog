import Link from 'next/link'
import { headers } from 'next/headers'
import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';


export default async function NotFound() {
    const headersList = headers()
    const languageCode = headersList.get('x-invoke-path')!.split('/')[1] as Locales;
    await loadLocaleAsync(languageCode || 'ar');
    const LL = i18nObject(languageCode || 'ar');

    return (
        <main className="flex min-h-screen p-1 md:p-24 md:px-48">
            <article
                className="flex flex-col min-w-full mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-black/25 rounded-xl p-3 text-white"
                dir={languageCode == 'ar' ? 'rtl' : ''}
            >
                <header className='flex justify-between'>
                    <h1 className='font-semibold text-5xl mt-auto mb-2'>
                        {LL.ERROR_404()}
                    </h1>
                </header>

                <hr />

                <p className='font-semibold text-6xl text-center mt-auto'>{LL.ERROR_404_PAGE_NOT_FOUND()}</p>
                <Link className='font-semibold text-4xl text-center underline mb-auto' href={`/${languageCode}`}>{LL.HOME_PAGE()}</Link>
            </article>
        </main >
    )
}
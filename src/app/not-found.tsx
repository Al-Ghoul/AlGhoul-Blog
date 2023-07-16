import Link from 'next/link'
import { cookies, headers } from 'next/headers'
import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';


export default async function NotFound() {
    const cookieStore = cookies()
    const languageCode = cookieStore.get('locale');
    await loadLocaleAsync(languageCode?.value as Locales || 'ar');
    const LL = i18nObject(languageCode?.value as Locales || 'ar');

    return (
        <main className="flex min-h-screen p-1 md:p-24 md:px-48">
            <article
                className="flex flex-col min-w-full mx-auto lg:mb-16 mb-8 backdrop-blur-3xl bg-blue-800/70 rounded-xl p-3 text-white"
                dir={languageCode?.value == 'ar' ? 'rtl' : ''}
            >
                <header className='flex justify-between'>
                    <h1 className='font-semibold text-5xl mt-auto mb-2'>
                        {LL.ERROR_404()}
                    </h1>
                </header>

                <hr />

                <p className='font-semibold text-6xl text-center mt-auto'>{LL.ERROR_404_PAGE_NOT_FOUND()}</p>
                <Link className='font-semibold text-4xl text-center underline mb-auto' href={`/${languageCode?.value || 'ar'}`}>{LL.HOME_PAGE()}</Link>
            </article>
        </main>
    )
}
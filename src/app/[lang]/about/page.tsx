import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return {
        title: `${LL.siteTitle()} - ${LL.ABOUT_US()}`,
    }
}

export default function About() {
    return (
        <main className="flex min-h-screen flex-col items-center ">
            <h1>To do</h1>
        </main>
    );
}
interface PageProps {
    params: {
        lang: string
    }
}
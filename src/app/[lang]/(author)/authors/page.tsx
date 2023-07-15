import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import CommonContainer from '@/components/general/CommonContainer';
import { notFound } from 'next/navigation';
import { getBaseUrl } from '@/helpers';
import type { Authors } from '@/helpers/db';

async function GetAuthors(languageCode: string) {
    const res = await fetch(`${getBaseUrl()}/api/authors/${languageCode}`, { next: { tags: ["authors"] } });

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json() as Promise<Authors>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return {
        title: `${LL.siteTitle()} - ${LL.AUTHORS_PAGE()}`,
    }
}


export default async function Tags({ params }: PageProps) {
    const authors = await GetAuthors(params.lang).catch(() => notFound());
    if (!authors.length) notFound();
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return (
        <CommonContainer
            lang={params.lang}
            header={LL.AUTHORS_PAGE()}
            contentList={authors}
        />
    );
}


interface PageProps {
    params: {
        lang: string,
    }
}
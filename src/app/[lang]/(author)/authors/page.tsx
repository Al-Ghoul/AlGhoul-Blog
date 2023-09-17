import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import CommonContainer from '@/components/general/CommonContainer';
import { notFound } from 'next/navigation';
import { getBaseUrl, getMetaData } from '@/helpers';

async function fetchAuthors(languageCode: string) {
    const res = await fetch(`${getBaseUrl()}/api/authors?langCode=${languageCode}`, { next: { tags: ["authors"] } });

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json() as Promise<{ authors: AuthorType }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return {
        title: LL.AUTHORS_PAGE(),
        description: LL.DESCRIPTION_AUTHORS(),
        ...getMetaData(
            {
                params: {
                    title: `${LL.siteTitle()} | ${LL.AUTHORS_PAGE()}`,
                    languageCode: params.lang,
                    description: LL.DESCRIPTION_AUTHORS(),
                    currentPath: '/authors',
                }
            }
        )
    }
}


export default async function Tags({ params }: PageProps) {
    const { authors } = await fetchAuthors(params.lang).catch(() => notFound());
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
        lang: Locales,
    }
}
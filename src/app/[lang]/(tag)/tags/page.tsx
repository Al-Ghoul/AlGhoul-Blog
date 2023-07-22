import { loadLocaleAsync } from '@/i18n/i18n-util.async';
import { i18nObject } from '@/i18n/i18n-util';
import type { Locales } from '@/i18n/i18n-types';
import { Metadata } from 'next'
import CommonContainer from '@/components/general/CommonContainer';
import { notFound } from 'next/navigation';
import { getBaseUrl, getMetaData } from '@/helpers';
import type { Tags } from '@/helpers/db';

async function GetTags(languageCode: string) {
    const res = await fetch(`${getBaseUrl()}/api/tags/${languageCode}`, { next: { tags: ["tags"] } });

    if (!res.ok) throw new Error("Failed to fetch data");

    return res.json() as Promise<{ tags: Tags }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return {
        title: LL.TAGS_PAGE(),
        description: LL.DESCRIPTION_TAGS(),
        ...getMetaData(
            {
                params: {
                    title: `${LL.siteTitle()} | ${LL.TAGS_PAGE()}`,
                    languageCode: params.lang,
                    description: LL.DESCRIPTION_TAGS(),
                    currentPath: '/tags',
                }
            }
        )
    }
}

export default async function Tags({ params }: PageProps) {
    const { tags } = await GetTags(params.lang).catch(() => notFound());
    if (!tags.length) notFound();
    await loadLocaleAsync(params.lang as Locales);
    const LL = i18nObject(params.lang as Locales);

    return (
        <CommonContainer
            lang={params.lang}
            header={LL.TAGS_PAGE()}
            contentList={tags}
        />
    );
}

interface PageProps {
    params: {
        lang: Locales,
    }
}